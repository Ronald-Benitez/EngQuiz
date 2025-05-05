import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome to the English Quizzes Starter App!
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/(quizzes)">
          <ThemedText type="link">Go to quizzes!</ThemedText>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
