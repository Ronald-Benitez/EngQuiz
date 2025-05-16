import { Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link } from 'expo-router';
import { ThemedBlock } from '@/components/themed/ThemedBlock';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Collapsible } from '@/components/Collapsible';
import { ScrollView } from 'react-native-gesture-handler';

interface QuizItem {
  title: string;
  href: string;
  icon: keyof typeof MaterialIcons.glyphMap; // Tipo más específico para 'icon'
}

const List: { title: string, quizzes: QuizItem[] }[] = [
  {
    title: "Section 1",
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
  },
  {
    title: "Section 2",
    quizzes: [
      {
        title: "Idiomatic",
        href: "Idiomatic",
        icon: "place"
      },
      {
        title: "Types of conditional sentences",
        href: "TypesOfConditional",
        icon: "compare"
      },
      {
        title: "Quantifiers",
        href: "Quantifiers",
        icon: "calculate"
      },
      {
        title: "Negative prefixes",
        href: "NegativePrefixes",
        icon: "minimize"
      }
    ]
  }

]

export default function QuizzesHome() {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Quizzes</ThemedText>
        </ThemedView>
        <ThemedView style={{ gap: 20 }}>
          {
            List?.map((item, key) => (
              <Collapsible title={item?.title} key={key}>
                <ThemedView style={[styles.quizList]}>
                  {
                    item?.quizzes?.map((quiz, index) => (
                      <ThemedView style={{ flex: 1, flexDirection: "row", width: "100%", gap: 5, marginVertical: 10, alignItems: "center" }} key={index}>
                        <Link href={
                          {
                            pathname: "/quizzes/quiz/[name]",
                            params: { name: quiz.href }
                          }
                        }
                          style={{ flex: 1 }}>
                          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name={quiz?.icon} size={24} color={iconColor} />
                            <ThemedText secondary>{quiz.title}</ThemedText>
                          </ThemedBlock>
                        </Link>
                        <Link href={
                          {
                            pathname: "/quizzes/statistics/[name]",
                            params: { name: quiz.href }
                          }
                        } >
                          <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <MaterialIcons name="bar-chart" size={24} color={iconColor} />
                          </ThemedBlock>
                        </Link>
                      </ThemedView>
                    ))
                  }
                </ThemedView>
              </Collapsible>
            ))
          }
        </ThemedView>
      </ScrollView>
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
    paddingHorizontal: 12,
    marginVertical: 10,
    flexDirection: "column"
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

});
