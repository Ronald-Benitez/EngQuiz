import { useAppSettings } from '@/src/hooks/useSettings';
import useTimer from '@/src/hooks/useTimer';
import useSpeak from '@/src/hooks/useSpeak';
import useQuiz from '@/src/hooks/useQuiz';
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
        import: () => import("@/src/files/quizzes/SimpleGerundsVSInfinitives.json")
    },
    ComplexGerundsVSInfinitives: {
        buildOptions,
        formatedSpeak: formatedGerundsInfinitivesSpeak,
        import: () => import("@/src/files/quizzes/ComplexGerundsVSInfinitives.json")
    },
    InOnAt: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/src/files/quizzes/InOnAt.json")
    },
    PerfectSentences: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/src/files/quizzes/PerfectSentences.json")
    },
    TypeOfSentences: {
        buildOptions,
        formatedSpeak: formatedTypeSentencesSpeak,
        import: () => import("@/src/files/quizzes/TypesOfSentences.json")
    },
    VerbTenses: {
        buildOptions: buildVerbOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/VerbsTenses.json")
    },
    Idiomatic: {
        buildOptions: buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/Idiomatics.json")
    },
    TypesOfConditional: {
        buildOptions: buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/TypesOfConditionals.json")
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

    if (!Object.keys(optionsConfig).includes(name)) return <Redirect href="/quizzes" />

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
                return <Redirect href="/quizzes" />
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