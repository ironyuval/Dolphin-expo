import { Stack } from 'expo-router';

export default function FeaturesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="support" />
      <Stack.Screen name="emergency" />
      <Stack.Screen name="scanner" />
      <Stack.Screen name="courses" />
    </Stack>
  );
}
