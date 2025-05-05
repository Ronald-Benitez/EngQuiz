import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { Switch } from 'react-native';
import { ThemedInput } from '@/components/themed/ThemedInput';
import { useAppSettings, UpdateOptions } from '@/src/hooks/useSettings';
import { ThemedPressable } from '@/components/themed/ThemedPressable';

/*
en-AU	English	Australia	Australian English
en-CA	English	Canada	Canadian English
en-GB	English	United Kingdom	British English
en-IE	English	Ireland	Irish English
en-IN	English	India	Indian English
en-NZ	English	New Zealand	New Zealand English
en-US	English	United States	US English
en-ZA	English	South Africa	English (South Africa)
*/

export default function SettingsScrean() {
  const { settings, updateSettings, resetSettings } = useAppSettings();

  const handleUpdate = (key: UpdateOptions, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    updateSettings(newSettings);
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: 40 }}>
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
              value={settings.questions.toString()}
              onChangeText={value => handleUpdate('questions', value)}
              keyboardType="numeric"
              placeholder="Number of questions"
            />
          </ThemedView>
        )
      }
      <ThemedView style={[styles.container, styles.col]}>
        <ThemedText >Accent</ThemedText>
        <ThemedView style={[{ gap: 8, flexWrap: 'wrap', flexDirection: 'row' }]}>
          {['en-AU', 'en-CA', 'en-GB', 'en-IE', 'en-IN', 'en-NZ', 'en-US', 'en-ZA'].map((accent) => (
            <ThemedPressable
              key={accent}
              onPress={() => handleUpdate('accent', accent)}
              style={{ padding: 8, borderRadius: 4 }}
              pressed={settings.accent === accent}
            >
              <ThemedText>{accent}</ThemedText>
            </ThemedPressable>
          ))}
        </ThemedView>
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
  container: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    gap: 12,
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
