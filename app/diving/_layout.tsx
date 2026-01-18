import { Stack } from 'expo-router';

export default function DivingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="history" />
      <Stack.Screen name="log-view" />
      <Stack.Screen name="log-form" />
      <Stack.Screen name="clubs" />
      <Stack.Screen name="courses-tree" />
    </Stack>
  );
}
