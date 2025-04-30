import questionsData from '@/files/SimpleGerundsVSInfinitives.json';
import { useAppSettings } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import { Completed, Question } from '@/interfaces';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';

export default function GerundsVSInfinitivesSimple() {
  const { settings } = useAppSettings();
  const timer = useTimer();
  const { speak, isSpeaking, stop: stopSpeak } = useSpeak();

  const buildOptions = () => {
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, settings.questions) as Question[];
  }

  const quiz = useQuiz({ buildOptions, timer });
  const { handleRestart, completed, showResult } = quiz;

  const formatedSpeak = (item: Completed) => {
    stopSpeak();
    const textToListen = `${item?.question?.question} ${item?.question?.options[item?.question?.correct]}`;
    speak(textToListen);
  }

  return (
    <QuizContainer quiz={quiz}>
      {
        showResult ?
          <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={formatedSpeak} />
          :
          <QuestionsBlock quiz={quiz} timer={timer} />
      }

    </QuizContainer>
  );
}