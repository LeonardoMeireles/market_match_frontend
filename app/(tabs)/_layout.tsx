import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/colorScheme/useColorScheme';
import { useClientOnlyValue } from '@/components/clientOnlyValue/useClientOnlyValue';
import { MarketMatchProvider } from '@/services/marketMatchContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <MarketMatchProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="(shoppingList)"
            options={{
              tabBarLabelStyle: {
                fontWeight: '700',
              },
              title: 'Listas',
              tabBarIcon: ({color}) => <TabBarIcon name="list-ul" color={color}/>,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabelStyle: {
                fontWeight: '700',
              },
              title: 'Usuário',
              tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
            }}
          />
        </Tabs>
      </MarketMatchProvider>
    </ThemeProvider>
  );
}
