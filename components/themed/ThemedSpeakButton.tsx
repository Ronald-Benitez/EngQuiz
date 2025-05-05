import { Pressable } from 'react-native';
import { ThemedBlock } from './ThemedBlock';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { UseSpeakReturn } from '@/src/hooks/useSpeak';

export type ThemedSpeakButtonProps = {
    lightColor?: string;
    darkColor?: string;
    style?: any;
    text: string
    speak: UseSpeakReturn
};

export function ThemedSpeakButton({ style = {}, lightColor, darkColor, speak, text }: ThemedSpeakButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'inputText');
    const { speak: speakText, stop } = speak

    const onSpeak = () => {
        speakText(text)
    }

    return (
        <Pressable onPress={onSpeak}>
            <ThemedBlock type='secondary' style={{ width: 45, height: 45, padding: 0, justifyContent: "center", alignItems: "center" }}>
                <MaterialIcons name="volume-up" size={20} color={color} />
            </ThemedBlock>
        </Pressable>
    )

}
