import { useAppSettings } from '@/src/hooks/useSettings';
import useTimer from '@/src/hooks/useTimer';
import useSpeak from '@/src/hooks/useSpeak';
import useQuiz from '@/src/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { formatedBasicSpeak } from '@/src/utils/formatedSpeaks';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import Fireworks from '@/components/animations/Fireworks';
import Confetti from '@/components/animations/Confetti';
import SadTears from '@/components/animations/SadTears';
import SadFace from '@/components/animations/SadFace';
import { ThemedView } from '@/components/themed/ThemedView';

const optionsConfig = {
    SectionTwoResume: {
        import: () => (Promise.all([
            import("@/src/files/quizzes/Idiomatics.json"),
            import("@/src/files/quizzes/TypesOfConditionals.json"),
            import("@/src/files/quizzes/Quantifiers.json"),
            import("@/src/files/quizzes/NegativePrefixes.json"),
            import("@/src/files/quizzes/Parallelism.json"),
            import("@/src/files/quizzes/PairedConjunctions.json"),
            import("@/src/files/quizzes/PassiveVoice.json"),
            import("@/src/files/quizzes/ModalVerbs.json"),
        ]))
    },
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
                const modules = await optionConfig.import();

                setQuestionsData(modules?.map(module => module.default));
                quiz?.handleRestart()
            } catch (error) {
                console.error("Error fetching questions:", error);
                return <Redirect href="/quizzes" />
            }
        };
        fetchQuestions()
        return () => {
            setQuestionsData([])
        }
    }, [optionConfig, settings?.resumeQuestions]);

    const buildQuiz = () => {
        console.log(questionsData)
        let selectedQuestions: any[] = [];

        questionsData.map((mod: any) => {
            const length = Number(settings.resumeQuestions) <= mod?.length ? settings.resumeQuestions : mod?.length
            const shuffled = [...mod].sort(() => 0.5 - Math.random());
            const tenRandom = shuffled.slice(0, length);
            selectedQuestions = selectedQuestions.concat(tenRandom);
        });
        return selectedQuestions
    }

    const quiz = useQuiz({ buildOptions: buildQuiz, timer, quizName: name });
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
                    <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={formatedBasicSpeak(speak)} />
                    :
                    <QuestionsBlock quiz={quiz} timer={timer} hideCurrent={true} />
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