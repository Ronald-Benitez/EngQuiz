import { Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { ThemedBlock } from '@/components/ThemedBlock';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function QuizzesHome() {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">English Quizzes</ThemedText>
      </ThemedView>

      <ThemedView style={styles.quizList}>
        <Link href="/(quizzes)/(m1)/SimpleGerundsVSInfinitives">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="compare" size={24} color={iconColor} />
            <ThemedText secondary> Gerunds vs Infinitives, simple</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/(quizzes)/(m1)/ComplexGerundsVSInfinitives">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="compare" size={24} color={iconColor} />
            <ThemedText secondary> Gerunds vs Infinitives, complex</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/(quizzes)/(m1)/VerbTenses">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="hourglass-empty" size={24} color={iconColor} />
            <ThemedText secondary>Verb Tenses</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/(quizzes)/(m1)/InOnAt">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="location-pin" size={24} color={iconColor} />
            <ThemedText secondary>In, on, at</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/(quizzes)/(m1)/TypesOfSentences">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="compare" size={24} color={iconColor} />
            <ThemedText secondary>Types of sentences</ThemedText>
          </ThemedBlock>
        </Link>
        <Link href="/(quizzes)/(m1)/PerfectSentences">
          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="all-inbox" size={24} color={iconColor} />
            <ThemedText secondary>Perfect sentences</ThemedText>
          </ThemedBlock>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  quizList: {
    gap: 12,
    paddingHorizontal: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

});
