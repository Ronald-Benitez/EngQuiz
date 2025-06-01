import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Switch } from 'react-native';
import { ThemedInput } from '@/components/themed/ThemedInput';
import { useAppSettings, UpdateOptions } from '@/src/hooks/useSettings';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { ScrollView } from 'react-native-gesture-handler';

/*

*/
const languages = [
  {
    code: "en-AU", description: "English Australia, Australian English"
  },
  {
    code: "en-CA", description: "English Canada, Canadian English"
  },
  {
    code: "en-GB", description: "English United Kingdom, British English"
  },
  {
    code: "en-IE", description: "English Ireland, Irish English"
  },
  {
    code: "en-IN", description: "English India, Indian English"
  },
  {
    code: "en-NZ", description: "English New Zealand, New Zealand English"
  },
  {
    code: "en-US", description: "English United States, US English"
  },
  {
    code: "en-ZA", description: "English South Africa	English (South Africa)"
  }
]

export default function SettingsScrean() {
  const { settings, updateSettings, resetSettings } = useAppSettings();

  const handleUpdate = (key: UpdateOptions, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: 40 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedView secondary style={styles.block}>
          <ThemedView style={[styles.container, styles.row]}>
            <ThemedText >Continue automatically</ThemedText>
            <Switch
              value={settings.automatically}
              onValueChange={value => handleUpdate('automatically', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </ThemedView>
          {settings.automatically && (
            <ThemedView style={[styles.container, styles.col, { marginTop: 0, paddingTop: 0 }]}>
              <ThemedText >Delay after answering a question (ms)</ThemedText>
              <ThemedInput
                value={settings.delay.toString()}
                onChangeText={value => handleUpdate('delay', value)}
                keyboardType="numeric"
                placeholder="Delay in ms"
              />
            </ThemedView>
          )}
        </ThemedView>
        <ThemedView secondary style={styles.block}>

          <ThemedView style={[styles.container, styles.row]}>
            <ThemedText >Listen mode</ThemedText>
            <Switch
              value={settings.listenMode}
              onValueChange={value => handleUpdate('listenMode', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </ThemedView>
          {
            settings?.listenMode && (
              <ThemedView style={[styles.container, styles.row, { marginTop: 0, paddingTop: 0 }]}>
                <ThemedText >Show questions</ThemedText>
                <Switch
                  value={settings.showQuestionInListenMode}
                  onValueChange={value => handleUpdate('showQuestionInListenMode', value)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
              </ThemedView>
            )
          }
        </ThemedView>
        <ThemedView secondary style={styles.block}>
          <ThemedView style={[styles.container, styles.row]}>
            <ThemedText >Max questions</ThemedText>
            <Switch
              value={settings.max}
              onValueChange={value => handleUpdate('max', value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </ThemedView>
          {
            !settings.max && (
              <ThemedView style={[styles.container, styles.col, { marginTop: 0, paddingTop: 0 }]}>
                <ThemedText >Questions per quiz</ThemedText>
                <ThemedInput
                  value={settings?.questions?.toString()}
                  onChangeText={value => handleUpdate('questions', value)}
                  keyboardType="numeric"
                  placeholder="Number of questions"
                />
              </ThemedView>
            )
          }
           <ThemedView style={[styles.container, styles.col, { marginTop: 0, paddingTop: 0 }]}>
            <ThemedText >Questions per resume</ThemedText>
            <ThemedInput
                  value={settings?.resumeQuestions?.toString()}
                  onChangeText={value => handleUpdate('resumeQuestions', value)}
                  keyboardType="numeric"
                  placeholder="Number of questions per resume"
                />
          </ThemedView>
        </ThemedView>
        <ThemedView secondary style={styles.block}>
          <ThemedView style={[styles.container, styles.col, { marginTop: 0, paddingTop: 0 }]}>
            <ThemedText >Animation duration (ms)</ThemedText>
            <ThemedInput
              value={settings?.animationDuration?.toString()}
              onChangeText={value => handleUpdate('animationDuration', value)}
              keyboardType="numeric"
              placeholder="Duration in ms"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView secondary style={styles.block}>
          <ThemedView style={[styles.container, styles.col]}>
            <ThemedText >Accent</ThemedText>
            <ThemedView style={[{ gap: 8, flexDirection: 'column' }]}>
              {languages.map((accent) => (
                <ThemedPressable
                  key={accent.code}
                  onPress={() => handleUpdate('accent', accent.code)}
                  style={{ padding: 8, borderRadius: 4 }}
                  pressed={settings?.accent === accent.code}
                >
                  <ThemedText>({accent.code}) {accent.description}</ThemedText>
                </ThemedPressable>
              ))}
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
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
  block: {
    marginHorizontal: 40,
    padding: 20,
    marginVertical: 10,
    gap: 10
  },
  container: {
    gap: 12,
    backgroundColor: "transparent"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
    gap: 8,
  },
});
