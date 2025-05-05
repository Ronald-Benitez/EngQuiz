import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export type ThemedViewProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    style?: any;
};

export function ThemedInput({ style = {}, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'inputBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'inputText');
    const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'inputBorder');

    return <TextInput style={[{ backgroundColor, color, borderColor, borderWidth: 1, padding: 10 }, style]} {...otherProps} />

}
