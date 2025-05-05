  import { View, type ViewProps } from 'react-native';

  import { useThemeColor } from '@/src/hooks/useThemeColor';

  export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    secondary?: boolean;
  };

  export function ThemedView({ style, lightColor, darkColor, secondary, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, secondary ? 'backgroundSecondary' : 'background');
    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  }
