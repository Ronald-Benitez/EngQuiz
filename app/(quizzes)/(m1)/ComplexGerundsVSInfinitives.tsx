import questionsData from '@/files/ComplexGerundsVSInfinitives.json';
import { useAppSettings } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { formatedGerundsInfinitivesSpeak } from '@/src/utils/formatedSpeaks';
import { buildOptions } from '@/src/utils/buildsOptions';

export default function ComplexGerundsVSInfinitives() {
  const { settings } = useAppSettings();
  const timer = useTimer();
  const speak = useSpeak();
  const quiz = useQuiz({ buildOptions: buildOptions(questionsData, settings), timer });
  const { handleRestart, completed, showResult } = quiz;


  return (
    <QuizContainer quiz={quiz}>
      {
        showResult ?
          <ResultsBlock completed={completed} handleRestart={handleRestart} time={timer.formatTime(timer.time)} speak={formatedGerundsInfinitivesSpeak(speak)} />
          :
          <QuestionsBlock quiz={quiz} timer={timer} />
      }

    </QuizContainer>
  );
}