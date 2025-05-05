import { useEffect, useState } from 'react';
import { useAppSettings } from '@/src/hooks/useSettings';
import { Completed, Question } from '@/src/interfaces';
import { UseTimerReturn } from '@/src/hooks/useTimer';

interface UseQuizProps {
    buildOptions: () => Question[];
    timer: UseTimerReturn;
}

export interface UseQuizReturn {
    handleBack: () => void;
    handleNext: () => void;
    handleRestart: () => void;
    handleSelect: (option: string) => void;
    currentQuestion: Question;
    current: number;
    completed: Completed[];
    verifyCompleted: (index: number) => void;
    questions: Question[];
    showResult: boolean;
    selected: string | null;
}

export default function useQuiz({ buildOptions, timer }: UseQuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [completed, setCompleted] = useState<Completed[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const { settings } = useAppSettings();
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (!questions || questions?.length < 1) {
            setQuestions(ramdomizeOptions());
        }
    }, [buildOptions, reload]);

    const ramdomizeOptions = () => {
        const list = buildOptions();
        list.forEach((item) => {
            const options = item.options
            options.sort(() => Math.random() - 0.5);
        })
        return list;
    }

    const handleSelect = (option: string) => {
        setSelected(option);
        const completedQuestion = {
            question: currentQuestion,
            selected: option,
            isCorrect: option === currentQuestion.correct,
        }

        const isAlreadyCompleted = completed.some(q => q.question === currentQuestion);
        if (!isAlreadyCompleted) {
            setCompleted(prev => [...prev, completedQuestion]);
        } else {
            return
        }

        if (selected !== null) return;

        if (settings.automatically) {
            setTimeout(() => {
                handleNext();
            }, settings.delay);
        }
    };

    const handleRestart = () => {
        setReload(!reload)
        setQuestions([]);
        setCurrent(0);
        setSelected(null);
        setShowResult(false);
        setCompleted([]);
        timer.reset();
    };

    const handleNext = () => {
        if (current + 1 < questions.length) {
            setCurrent(prev => prev + 1);
            setSelected(null);
            verifyCompleted(current + 1);
        } else {
            setShowResult(true);
            timer.stop();
        }
    }

    const handleBack = () => {
        if (current > 0) {
            setCurrent(prev => prev - 1);
            verifyCompleted(current - 1);
            setSelected(completed[current - 1]?.selected);
        }
    }

    const verifyCompleted = (index: number) => {
        const completedQuestion = completed[index];
        if (completedQuestion) {
            setSelected(completedQuestion.selected);
        }
    }

    const currentQuestion = questions[current];

    return {
        handleBack,
        handleNext,
        handleRestart,
        handleSelect,
        currentQuestion,
        current,
        completed,
        verifyCompleted,
        questions,
        showResult,
        selected,
    }
}