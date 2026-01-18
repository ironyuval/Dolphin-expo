import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { I18nManager } from 'react-native';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

// Force RTL for Hebrew
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

export default function RootLayout() {
  useEffect(() => {
    // Ensure RTL is enabled
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      I18nManager.allowRTL(true);
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FAFAFA' },
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="diving" options={{ headerShown: false }} />
          <Stack.Screen name="documents" options={{ headerShown: false }} />
          <Stack.Screen name="features" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
