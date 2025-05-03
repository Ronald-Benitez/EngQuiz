import { Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { ThemedBlock } from '@/components/ThemedBlock';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Collapsible } from '@/components/Collapsible';

interface QuizItem {
  title: string;
  href: string;
  icon: keyof typeof MaterialIcons.glyphMap; // Tipo más específico para 'icon'
}

const List: { title: string, quizzes: QuizItem[] }[] = [
  {
    title: "Block 1",
    quizzes: [
      {
        title: "Gerunds vs Infinitives, simple",
        href: "SimpleGerundsVSInfinitives",
        icon: "compare"
      },
      {
        title: "Gerunds vs Infinitives, complex",
        href: "ComplexGerundsVSInfinitives",
        icon: "compare"
      },
      {
        title: "Verb tenses",
        href: "VerbTenses",
        icon: "hourglass-empty",
      },
      {
        title: "In, on, at",
        href: "InOnAt",
        icon: "location-pin"
      },
      {
        title: "Types of sentences",
        href: "TypeOfSentences",
        icon: "compare"
      },
      {
        title: "Perfect sentences",
        href: "PerfectSentences",
        icon: "all-inbox"
      }
    ],
  }

]

export default function QuizzesHome() {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">English Quizzes</ThemedText>
      </ThemedView>

      {
        List?.map((item, key) => (
          <Collapsible title={item?.title} key={key}>
            <ThemedView style={styles.quizList}>
              {
                item?.quizzes?.map((quiz, index) => (
                  <Link href={
                    {
                      pathname: "/quiz/[name]",
                      params: { name: quiz.href }
                    }
                  } key={index}>
                    <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <MaterialIcons name={quiz?.icon} size={24} color={iconColor} />
                      <ThemedText secondary>{quiz.title}</ThemedText>
                    </ThemedBlock>
                  </Link>
                ))
              }
            </ThemedView>
          </Collapsible>
        ))
      }
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
