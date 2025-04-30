import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Switch } from 'react-native';
import { Link } from 'expo-router';
import { ThemedInput } from '@/components/ThemedInput';
import { useAppSettings } from '@/hooks/useSettings';

export default function SettingsScrean() {
  const { settings, updateSettings, resetSettings } = useAppSettings();

  const handleUpdate = (key: string, value: string | boolean) => {
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
      <ThemedView style={[styles.container, styles.col]}>
        <ThemedText >Delay after answering a question (ms)</ThemedText>
        <ThemedInput
          value={settings.delay.toString()}
          onChangeText={value => handleUpdate('delay', value)}
          keyboardType="numeric"
          placeholder="Delay in ms"
        />
      </ThemedView>
      <ThemedView style={[styles.container, styles.col]}>
        <ThemedText >Questions per quiz</ThemedText>
        <ThemedInput
          value={settings.questions.toString()}
          onChangeText={value => handleUpdate('questions', value)}
          keyboardType="numeric"
          placeholder="Number of questions"
        />
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
