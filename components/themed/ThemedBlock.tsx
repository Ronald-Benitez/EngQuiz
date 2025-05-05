import { View, type ViewProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/src/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'secondary' | 'tertiary';
};

export function ThemedBlock({ style, lightColor, darkColor, type = "default", ...otherProps }: ThemedViewProps) {
    const colors = {
        default: useThemeColor({}, 'blockContainer'),
        secondary: useThemeColor({}, 'secondaryBlockContainer'),
        tertiary: useThemeColor({}, 'terciaryBlockContainer'),
    }
    return <View style={[styles.blockContainer, { backgroundColor: colors[type] }, style]} {...otherProps} />;
}

const styles = StyleSheet.create({
    blockContainer: {
        padding: 16,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 2,
        width: '100%',
    },
});
