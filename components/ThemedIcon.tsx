import { View, type ViewProps } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Zocial from '@expo/vector-icons/Zocial';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type Icon } from '@expo/vector-icons/build/createIconSet';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedIconProps =  {
  lightColor?: string;
  darkColor?: string;
  secondary?: boolean;
  type?: "MaterialIcons" | "Ionicons" | "FontAwesome" | "FontAwesome5" | "Entypo" | "EvilIcons" | "Feather" | "Fontisto" | "Foundation" | "MaterialCommunityIcons" | "Octicons" | "SimpleLineIcons" | "Zocial";
  iconName?: string;
  style?: any;
  name?: strin
};

export function ThemedView({ style, lightColor, darkColor, secondary, type, name, ...otherProps }: ThemedIconProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, secondary ? 'backgroundSecondary' : 'background');
  switch(type) {
    case "MaterialIcons":
      return <MaterialIcons style={[{ backgroundColor }, style]} name={name} />;
    case "Ionicons":
      return <Ionicons style={[{ backgroundColor }, style]} {...otherProps} />;
    case "FontAwesome":
      return <FontAwesome style={[{ backgroundColor }, style]} {...otherProps} />;
    case "FontAwesome5":
      return <FontAwesome5 style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Entypo":
      return <Entypo style={[{ backgroundColor }, style]} {...otherProps} />;
    case "EvilIcons":
      return <EvilIcons style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Feather":
      return <Feather style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Fontisto":
      return <Fontisto style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Foundation":
      return <Foundation style={[{ backgroundColor }, style]} {...otherProps} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Octicons":
      return <Octicons style={[{ backgroundColor }, style]} {...otherProps} />;
    case "SimpleLineIcons":
      return <SimpleLineIcons style={[{ backgroundColor }, style]} {...otherProps} />;
    case "Zocial":
      return <Zocial style={[{ backgroundColor }, style]} {...otherProps} />;
    default:
      return <View>{otherProps.children}</View>;

  }
}
