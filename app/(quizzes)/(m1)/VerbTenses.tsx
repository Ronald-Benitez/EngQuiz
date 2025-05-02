import questionsData from '@/files/VerbsTenses.json';
import { useAppSettings } from '@/hooks/useSettings';
import useTimer from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';
import useQuiz from '@/hooks/useQuiz';
import QuizContainer from '@/components/blocks/QuizContainer';
import ResultsBlock from '@/components/blocks/ResultsBlock';
import QuestionsBlock from '@/components/blocks/QuestionsBlock';
import { formatedBasicSpeak } from '@/src/utils/formatedSpeaks';
import { buildVerbOptions } from '@/src/utils/buildsOptions';


export default function GerundsVSInfinitivesSimple() {
  const { settings } = useAppSettings();
  const timer = useTimer();
  const speak = useSpeak();

  const quiz = useQuiz({ buildOptions: buildVerbOptions(questionsData, settings), timer });
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