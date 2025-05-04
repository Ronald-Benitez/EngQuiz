import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AppSettingsProvider } from '@/hooks/useSettings';

export default function Layout() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppSettingsProvider>
      <Drawer
        screenOptions={{
          drawerStyle: {
            backgroundColor,
            width: '100%',
          },
          drawerLabelStyle: {
            color: textColor,
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          headerTintColor: textColor,
          drawerActiveBackgroundColor: 'rgba(10, 126, 164, 0.1)',
          drawerActiveTintColor: textColor,
          drawerInactiveTintColor: textColor,
        }
        }
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'overview',
          }}
        />
        <Drawer.Screen
          name="(quizzes)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Quizzes',
            // drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            title: 'Quizzes',
          }}
        />
        <Drawer.Screen
          name="(settings)/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            // drawerIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            title: 'Settings',
          }}
        />
      </Drawer>
      </AppSettingsProvider>
    </GestureHandlerRootView>
  );
}
