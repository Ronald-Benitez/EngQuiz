import questionsData from '@/files/SimpleGerundsVSInfinitives.json';
import { useAppSettings } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { buildOptions } from '@/src/utils/buildsOptions';
import { formatedBasicSpeak } from '@/src/utils/formatedSpeaks';

export default function GerundsVSInfinitivesSimple() {
  const { settings } = useAppSettings();
  const timer = useTimer();
  const speak = useSpeak();

  const quiz = useQuiz({ buildOptions: buildOptions(questionsData, settings), timer });
  const { handleRestart, completed, showResult } = quiz;

  return (
    <QuizContainer quiz={quiz}>
      {
        showResult ?
          <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={formatedBasicSpeak(speak)} />
          :
          <QuestionsBlock quiz={quiz} timer={timer} />
      }

    </QuizContainer>
  );
}