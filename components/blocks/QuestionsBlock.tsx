import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedPressable } from '@/components/ThemedPressable';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedBlock } from '@/components/ThemedBlock';
import { UseTimerReturn } from '@/hooks/useTimer';
import useSpeak from '@/hooks/useSpeak';

import { UseQuizReturn } from '@/hooks/useQuiz';

interface QuestionsBlockProps {
  quiz: UseQuizReturn;
  timer: UseTimerReturn;
}

export default function QuestionsBlock({ quiz, timer }: QuestionsBlockProps) {
  const color = useThemeColor({}, 'text');
  const correctColor = useThemeColor({}, 'correct');
  const wrongColor = useThemeColor({}, 'incorrect');
  const { speak, isSpeaking, stop: stopSpeak } = useSpeak();

  const currentQuestion = quiz?.currentQuestion;

  return (
    <>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
        <ThemedBlock type='secondary' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, paddingVertical: 10, flex: 1, }}>
          <ThemedText style={{ fontWeight: 'light' }}>Current:</ThemedText>
          <ThemedText style={{ textTransform: "capitalize", fontWeight: "normal" }}>{currentQuestion?.main}</ThemedText>
        </ThemedBlock>
        <Pressable onPress={() => speak(currentQuestion?.main)}>
          <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
            <MaterialIcons name="volume-up" size={20} color={color} />
          </ThemedBlock>
        </Pressable>
      </ThemedView>

      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
        <ThemedBlock type='secondary' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, paddingVertical: 10, flex: 1 }}>
          <ThemedText>{currentQuestion?.question?.replace("${}", "__")}</ThemedText>
        </ThemedBlock>
        <Pressable onPress={() => speak(currentQuestion?.question)}>
          <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
            <MaterialIcons name="volume-up" size={20} color={color} />
          </ThemedBlock>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.optionsContainer}>
        {currentQuestion?.options?.map((option, index) => {
          const isCorrect = quiz.selected !== null && index === currentQuestion.correct;
          const isWrong = quiz.selected === index && index !== currentQuestion.correct;

          return (
            <Pressable
              key={index}
              onPress={() => quiz.handleSelect(index)}
            >
              <ThemedBlock type='tertiary' style={[styles.option, styles.optionsContainer, quiz.selected !== null && (isCorrect ? { backgroundColor: correctColor } : isWrong ? { backgroundColor: wrongColor } : styles.disabled)]}>
                <ThemedText>{option}</ThemedText>
              </ThemedBlock>
            </Pressable>
          );
        })}
      </ThemedView>

      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
        <ThemedPressable onPress={quiz.handleBack} style={styles.button}>
          <MaterialIcons name="arrow-back" size={24} color={color} />
        </ThemedPressable>
        <ThemedPressable onPress={quiz.handleNext} style={[styles.button, quiz.selected == null && styles.disabled]} disabled={quiz.selected == null}>
          <MaterialIcons name="arrow-forward" size={24} color={color} />
        </ThemedPressable>
      </ThemedView>
      <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 40 }}>
        <ThemedText style={{ textTransform: "capitalize", fontWeight: "normal" }}>{timer.formatTime(timer.time)}</ThemedText>
      </ThemedView>
      <Pressable onPress={quiz.handleRestart}>
        <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center", marginTop: 50 }}>
          <MaterialIcons name="refresh" size={24} color={color} />
        </ThemedBlock>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    padding: 12,
    borderRadius: 2,
    width: 250,
  },
  correct: {
    backgroundColor: '#b3f7b3',
  },
  wrong: {
    backgroundColor: '#f7b3b3',
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
});
