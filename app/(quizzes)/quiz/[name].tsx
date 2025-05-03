import { useAppSettings } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { buildOptions, buildVerbOptions } from '@/src/utils/buildsOptions';
import { formatedBasicSpeak, formatedGerundsInfinitivesSpeak, formatedSplittedSpeak, formatedTypeSentencesSpeak } from '@/src/utils/formatedSpeaks';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

const optionsConfig = {
    SimpleGerundsVSInfinitives: {
        buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/files/SimpleGerundsVSInfinitives.json")
    },
    ComplexGerundsVSInfinitives: {
        buildOptions,
        formatedSpeak: formatedGerundsInfinitivesSpeak,
        import: () => import("@/files/ComplexGerundsVSInfinitives.json")
    },
    InOnAt: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/files/InOnAt.json")
    },
    PerfectSentences: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/files/PerfectSentences.json")
    },
    TypeOfSentences: {
        buildOptions,
        formatedSpeak: formatedTypeSentencesSpeak,
        import: () => import("@/files/TypesOfSentences.json")
    },
    VerbTenses: {
        buildOptions: buildVerbOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/files/VerbsTenses.json")
    }
} as const;

type OptionsConfig = typeof optionsConfig;
type OptionName = keyof OptionsConfig;

export default function DynamicQuiz() {
    const { name: nameParam } = useLocalSearchParams();
    const name = nameParam as OptionName;
    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const [optionConfig, setOptionConfig] = useState<OptionsConfig[OptionName]>(optionsConfig[name]);
    const { settings } = useAppSettings();
    const timer = useTimer();
    const speak = useSpeak();

    if (!Object.keys(optionsConfig).includes(name)) return <Redirect href="/(quizzes)" />

    useEffect(() => {
        setOptionConfig(optionsConfig[name])
    }, [name])

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!optionConfig) return
            try {
                const module = await optionConfig.import()
                setQuestionsData(module.default);
                quiz?.handleRestart()
            } catch (error) {
                return <Redirect href="/(quizzes)" />
            }
        };
        fetchQuestions()
        return () => {
            setQuestionsData([])
        }
    }, [optionConfig]);

    const quiz = useQuiz({ buildOptions: optionConfig.buildOptions(questionsData, settings), timer });
    const { handleRestart, completed, showResult } = quiz;

    if (!questionsData) {
        return <div>Loading configuration...</div>;
    }

    return (
        <QuizContainer quiz={quiz}>
            {
                showResult ?
                    <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={optionConfig?.formatedSpeak(speak)} />
                    :
                    <QuestionsBlock quiz={quiz} timer={timer} />
            }
        </QuizContainer>
    );
}