import { Image, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Link } from 'expo-router';
import { ThemedBlock } from '@/components/themed/ThemedBlock';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { Collapsible } from '@/components/Collapsible';

interface TipItem {
  title: string;
  href: string;
  icon: keyof typeof MaterialIcons.glyphMap; // Tipo más específico para 'icon'
}

const List: { title: string, tips: TipItem[] }[] = [
  {
    title: "Section 1",
    tips: [
      {
        title: "Gerunds vs Infinitives",
        href: "GerundsVSInfinitives",
        icon: "compare"
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
    tips: [
      {
        title: "Types of conditional sentences",
        href: "TypesOfConditional",
        icon: "type-specimen"
      },
      {
        title: "Quantifiers",
        href: "Quantifiers",
        icon: "calculate"
      },
      {
        title: "Negative prefixes to form antonyms",
        href: "NegativePrefixes",
        icon: "not-interested"
      },
      {
        title: "Parallelism",
        href: "Parallelism",
        icon: "compare-arrows"
      },
      {
        title: "Paired conjuctions",
        href: "PairedConjunctions",
        icon: "link"
      },
      {
        title: "Passive voice",
        href: "PassiveVoice",
        icon: "spoke"
      },
      {
        title: "Modal verbs",
        href: "ModalVerbs",
        icon: "sync"
      },
    ]
  }

]

export default function QuizzesHome() {
  const iconColor = useThemeColor({}, 'textSecondary');

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Tips</ThemedText>
        </ThemedView>
        <ThemedView style={{ gap: 20 }}>
          {
            List?.map((item, key) => (
              <Collapsible title={item?.title} key={key}>
                <ThemedView style={styles.quizList}>
                  {
                    item?.tips?.map((tip, index) => (
                      <Link href={
                        {
                          pathname: "/tips/tip/[name]",
                          params: { name: tip.href }
                        }
                      } key={index}>
                        <ThemedBlock style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <MaterialIcons name={tip?.icon} size={24} color={iconColor} />
                          <ThemedText secondary>{tip.title}</ThemedText>
                        </ThemedBlock>
                      </Link>
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
    gap: 20
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
