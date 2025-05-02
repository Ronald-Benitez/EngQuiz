import { ThemedText } from '@/components/ThemedText';
import questionsData from '@/files/TypesOfSentences.json';
import { useAppSettings, calculateQuestions } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import { Completed, Question } from '@/interfaces';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { buildOptions } from '@/src/utils/buildsOptions';
import { formatedTypeSentencesSpeak } from '@/src/utils/formatedSpeaks';

export default function ComplexGerundsVSInfinitives() {
    const { settings } = useAppSettings();
    const timer = useTimer();
    const speak = useSpeak();

    const quiz = useQuiz({ buildOptions: buildOptions(questionsData, settings), timer });
    const { handleRestart, completed, questions, showResult } = quiz;

    return (
        <QuizContainer quiz={quiz}>
            {
                showResult ?
                    <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={formatedTypeSentencesSpeak(speak)} />
                    :
                    <QuestionsBlock quiz={quiz} timer={timer} hideCurrent />
            }

        </QuizContainer>
    );
}