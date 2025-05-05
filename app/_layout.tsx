import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { AppSettingsProvider } from '@/src/hooks/useSettings';
import { SpeakProvider } from '@/src/hooks/useSpeak';
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppSettingsProvider>
        <SpeakProvider>
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
              name="index"
              options={{
                drawerLabel: 'Home',
                title: 'Home',
              }}
            />
            <Drawer.Screen
              name="quizzes"
              options={{
                drawerLabel: 'Quizzes',
                drawerIcon: ({ color }) => <MaterialIcons size={28} name="quiz" color={color} />,
                title: 'Quizzes',
              }}
            />
            <Drawer.Screen
              name="tips"
              options={{
                drawerLabel: 'Tips',
                drawerIcon: ({ color }) => <MaterialIcons size={28} name="lightbulb-outline" color={color} />,
                title: 'Tips',
              }}
            />
            <Drawer.Screen
              name="settings/index"
              options={{
                drawerLabel: 'Settings',
                drawerIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
                title: 'Settings',
              }}
            />
            <Drawer.Screen
              name="+not-found"
              options={{
                drawerItemStyle: { display: 'none' }
              }}
            />
          </Drawer>
        </SpeakProvider>
      </AppSettingsProvider>
    </GestureHandlerRootView>
  );
}
