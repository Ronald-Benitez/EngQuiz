import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeColor } from '@/src/hooks/useThemeColor';


export default function TabLayout() {
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor,
            borderTopWidth: 0,
            shadowColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
        }),
        headerTintColor: textColor,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tips',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tip/[name]"
        options={{
          tabBarItemStyle: {
            display: 'none'
          }
        }}
      />
    </Tabs>
  );
}
