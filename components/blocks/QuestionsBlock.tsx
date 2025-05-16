import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { ThemedBlock } from '@/components/themed/ThemedBlock';
import { UseTimerReturn } from '@/src/hooks/useTimer';
import useSpeak from '@/src/hooks/useSpeak';
import { useAppSettings } from '@/src/hooks/useSettings';
import { ThemedSpeakButton } from '../themed/ThemedSpeakButton';

import { UseQuizReturn } from '@/src/hooks/useQuiz';
import { useEffect, useState } from 'react';

interface QuestionsBlockProps {
  quiz: UseQuizReturn;
  timer: UseTimerReturn;
  hideCurrent?: boolean;
}

export default function QuestionsBlock({ quiz, timer, hideCurrent }: QuestionsBlockProps) {
  const color = useThemeColor({}, 'text');
  const correctColor = useThemeColor({}, 'correct');
  const wrongColor = useThemeColor({}, 'incorrect');
  const speak = useSpeak();
  const [showQuestion, setShowQuestion] = useState(false)
  const { settings } = useAppSettings()

  const currentQuestion = quiz?.currentQuestion;


  useEffect(() => {
    if (settings?.listenMode) {
      speak.speak(currentQuestion?.question?.replaceAll("___", "_"))
    }
    setShowQuestion(false)
  }, [quiz?.currentQuestion])

  const showQuestionVal = !settings.listenMode ? true : settings.showQuestionInListenMode || showQuestion

  return (
    <ScrollView style={{ flex: 1, width: '100%', }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <ThemedView style={{ justifyContent: "center", width: "100%", flex: 1, alignItems: "center", gap: 8 }}>
        {
          !hideCurrent && (
            <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
              <ThemedBlock type='secondary' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, paddingVertical: 10, flex: 1, }}>
                <ThemedText style={{ fontWeight: 'light' }}>Current:</ThemedText>
                <ThemedText style={{ textTransform: "capitalize", fontWeight: "normal" }}>{currentQuestion?.main}</ThemedText>
              </ThemedBlock>
              <ThemedSpeakButton speak={speak} text={currentQuestion?.main} />
            </ThemedView>
          )
        }

        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
          {
            showQuestionVal && (
              <ThemedBlock type='secondary' style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 8, paddingVertical: 10, flex: 1 }}>
                <ThemedText>{currentQuestion?.question}</ThemedText>
              </ThemedBlock>
            )
          }
          {
            !showQuestionVal && (
              <Pressable onPress={() => setShowQuestion(true)}>
                <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
                  <MaterialIcons name="remove-red-eye" size={20} color={color} />
                </ThemedBlock>
              </Pressable>
            )
          }
          <ThemedSpeakButton speak={speak} text={currentQuestion?.question.replaceAll("_", "")} />
        </ThemedView>

        <ThemedView style={styles.optionsContainer}>
          {currentQuestion?.options?.map((option, index) => {
            const isCorrect = quiz.selected !== null && option === currentQuestion.correct;
            const isWrong = quiz.selected === option && option !== currentQuestion.correct;

            return (
              <Pressable
                key={index}
                onPress={() => quiz.handleSelect(option)}
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
      </ThemedView>
    </ScrollView>
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
