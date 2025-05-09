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
import LottieView from 'lottie-react-native';

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
    }
} as const;

type OptionsConfig = typeof optionsConfig;
type OptionName = keyof OptionsConfig;

const animationsOption = [
    () => require('@/assets/lottie/confetti.json'),
    () => require('@/assets/lottie/fireworks.json'),
    () => require('@/assets/lottie/bad.json'),
]

export default function DynamicQuiz() {
    const { name: nameParam } = useLocalSearchParams();
    const name = nameParam as OptionName;
    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const [optionConfig, setOptionConfig] = useState<OptionsConfig[OptionName]>(optionsConfig[name]);
    const { settings } = useAppSettings();
    const [showAnimation, setShowAnimation] = useState(false)
    const [file, setFile] = useState('@/assets/lottie/confetti.json')

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
    useEffect(() => {
        if (showResult) {
            setShowAnimation(true)
            const totalCorrect = completed.filter(q => q.isCorrect)?.length;
            const percentage = totalCorrect / quiz?.questions?.length
            if (percentage >= 0.8) {
                setFile(animationsOption[0]())
            } else if (percentage >= 0.6) {
                setFile(animationsOption[1]())
            } else {
                setFile(animationsOption[2]())
            }
            setTimeout(() => {
                setShowAnimation(false)
            }, settings?.animationDuration || 2000)
        }
    }, [showResult])

    return (
        <QuizContainer quiz={quiz}>
            {
                showAnimation && (
                    <LottieView
                        autoPlay
                        style={{
                            width: 200,
                            height: 200,
                            backgroundColor: 'transparent',
                        }}
                        source={file}
                    />
                )
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