import { Pressable, type PressableProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    style?: any;
};

export function ThemedPressable({ style = {}, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundPressable');
    return <Pressable style={[{ backgroundColor }, style]} {...otherProps}>
        {otherProps.children}
    </Pressable>;
}
