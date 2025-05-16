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
import Fireworks from '@/components/animations/Fireworks';
import Confetti from '@/components/animations/Confetti';
import SadTears from '@/components/animations/SadTears';
import SadFace from '@/components/animations/SadFace';
import { ThemedView } from '@/components/themed/ThemedView';

const optionsConfig = {
    SimpleGerundsVSInfinitives: {
        buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/SimpleGerundsVSInfinitives.json"),
        hideCurrent: false
    },
    ComplexGerundsVSInfinitives: {
        buildOptions,
        formatedSpeak: formatedGerundsInfinitivesSpeak,
        import: () => import("@/src/files/quizzes/ComplexGerundsVSInfinitives.json"),
        hideCurrent: false
    },
    InOnAt: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/src/files/quizzes/InOnAt.json"),
        hideCurrent: true
    },
    PerfectSentences: {
        buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/src/files/quizzes/PerfectSentences.json"),
        hideCurrent: true
    },
    TypeOfSentences: {
        buildOptions,
        formatedSpeak: formatedTypeSentencesSpeak,
        import: () => import("@/src/files/quizzes/TypesOfSentences.json"),
        hideCurrent: true
    },
    VerbTenses: {
        buildOptions: buildVerbOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/VerbsTenses.json"),
        hideCurrent: false
    },
    Idiomatic: {
        buildOptions: buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/Idiomatics.json"),
        hideCurrent: false
    },
    TypesOfConditional: {
        buildOptions: buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/TypesOfConditionals.json"),
        hideCurrent: false
    },
    Quantifiers: {
        buildOptions: buildOptions,
        formatedSpeak: formatedSplittedSpeak,
        import: () => import("@/src/files/quizzes/Quantifiers.json"),
        hideCurrent: true
    },
    NegativePrefixes: {
        buildOptions: buildOptions,
        formatedSpeak: formatedBasicSpeak,
        import: () => import("@/src/files/quizzes/NegativePrefixes.json"),
        hideCurrent: true
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
    const [showAnimation, setShowAnimation] = useState(false)
    const [percentage, setPercentage] = useState(0)

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

    const quiz = useQuiz({ buildOptions: optionConfig.buildOptions(questionsData, settings), timer, quizName: name });
    const { handleRestart, completed, showResult } = quiz;

    if (!questionsData) {
        return <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>Loading configuration...</ThemedView>;
    }

    useEffect(() => {
        if (showResult) {
            setShowAnimation(true)
            const totalCorrect = completed.filter(q => q.isCorrect)?.length;
            const value = totalCorrect / quiz?.questions?.length
            setPercentage(value)
            setTimeout(() => {
                setShowAnimation(false)
            }, settings?.animationDuration || 2000)
        }
    }, [showResult])

    return (
        <QuizContainer quiz={quiz}>
            {
                showAnimation && <ShowAnimation percentage={percentage} />
            }
            {
                showResult ?
                    <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={optionConfig?.formatedSpeak(speak)} />
                    :
                    <QuestionsBlock quiz={quiz} timer={timer} hideCurrent={optionConfig?.hideCurrent} />
            }
        </QuizContainer>
    );
}

const ShowAnimation = ({ percentage }: { percentage: number }) => {
    if (percentage >= 0.8) {
        return <Fireworks />
    } else if (percentage >= 0.6) {
        return <Confetti />
    } else {
        return (
            <>
                <SadTears />
                <SadFace />
            </>
        )
    }
}