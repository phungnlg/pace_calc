import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useAppStore } from '../../src/store/useAppStore';
import { lightTheme, darkTheme, AppColors } from '../../src/core/theme/colors';

export default function TabLayout() {
  const isDark = useAppStore((s) => s.isDark);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? AppColors.primaryLight : AppColors.primary,
        tabBarInactiveTintColor: theme.subtext,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Triathlon',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\u{1F3CA}'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="running"
        options={{
          title: 'Running',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\u{1F3C3}'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\u{1F4CB}'}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>{'\u{2699}\u{FE0F}'}</Text>
          ),
        }}
      />
    </Tabs>
  );
}
