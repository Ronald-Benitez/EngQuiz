import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedBlock } from '@/components/themed/ThemedBlock';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';

import { Link } from 'expo-router';

export default function HomeScreen() {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ textAlign: "center" }}>
          Welcome to EngQuiz
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={{ textAlign: "center", maxWidth: 500 }}>
          Your ultimate English learning buddy!
          At the heart of EngQuiz are engaging quizzes designed to sharpen your skills and boost your confidence.
          But that’s not all—each quiz is paired with handy tips to help you master the topics being evaluated.
          Let’s make learning effortless and exciting—your journey starts now!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.list}>
        <Link href="/quizzes" style={{ width: "100%", maxWidth: 400 }}>
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="quiz" size={24} color={iconColor} />
            <ThemedText secondary>Quizzes</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/tips" style={{ width: "100%", maxWidth: 400 }}>
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="lightbulb-outline" size={24} color={iconColor} />
            <ThemedText secondary>Tips</ThemedText>
          </ThemedBlock>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    gap: 8,
  },
  list: {
    gap: 12,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "center"
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
