/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: "#ffffff",
    background: '#fff',
    backgroundSecondary: '#F4F4F5',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    backgroundPressable: '#E1E1E6',
    textPressable: '#11181C',
    inputText: '#11181C',
    inputTextPlaceholder: '#687076',
    inputBackground: '#F4F4F5',
    inputBorder: '#687076',
    blockContainer: '#000000',
    secondaryBlockContainer: '#F8F8F8',
    terciaryBlockContainer: '#717171',
    correct: '#00B300',
    incorrect: '#FF0000',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: "#000000",
    background: '#151718',
    backgroundSecondary: '#1D3D47',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    backgroundPressable: '#2A2C30',
    textPressable: '#ECEDEE',
    inputText: '#ECEDEE',
    inputTextPlaceholder: '#9BA1A6',
    inputBackground: '#151718',
    inputBorder: '#9BA1A6',
    blockContainer: '#ffffff',
    secondaryBlockContainer: '#222222',
    terciaryBlockContainer: '#A9A9A9',
    correct: '#00B300',
    incorrect: '#FF0000',
  },
};
