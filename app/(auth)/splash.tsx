import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/design-system';
import SplashLogo from '@/assets/logos/dolphin-splash-logo.svg';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto-navigate to language screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(auth)/language');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <SplashLogo width={250} height={250} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
