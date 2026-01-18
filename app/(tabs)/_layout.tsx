import { Tabs } from 'expo-router';
import { colors } from '@/constants/design-system';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // We use custom BottomNav component
        },
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
