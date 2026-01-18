import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="setup-1" />
      <Stack.Screen name="setup-2" />
      <Stack.Screen name="update" />
    </Stack>
  );
}
