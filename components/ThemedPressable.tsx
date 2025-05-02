import { Pressable, type PressableProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    style?: any;
    pressed?: boolean;
};

export function ThemedPressable({ style = {}, lightColor, darkColor, pressed, ...otherProps }: ThemedViewProps) {
    const backgroundColorDefault = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundPressable');
    const pressedBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundPressablePressed');
    const backgroundColor = pressed ? pressedBackgroundColor : backgroundColorDefault;
    return <Pressable style={[{ backgroundColor }, style]} {...otherProps}>
        {otherProps.children}
    </Pressable>;
}
