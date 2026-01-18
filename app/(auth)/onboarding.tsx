import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, PanResponder } from 'react-native';
import { useRouter } from 'expo-router';
import BackgroundImage from '@/components/shared/BackgroundImage';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import AuthBg from '@/assets/backgrounds/auth-main-bg.svg';
import DLogo from '@/assets/backgrounds/dolphin-logo-d.svg';
const onboardingPhoto = require('@/assets/photos/onboarding-photo.png');

export default function Onboarding() {
  const router = useRouter();
  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        const minSwipeDistance = 50;
        if (gestureState.dx > minSwipeDistance) {
          // Swipe right - go back
          router.back();
        } else if (gestureState.dx < -minSwipeDistance) {
          // Swipe left - go forward
          router.push('/(auth)/welcome');
        }
      },
    })
  );

  return (
    <BackgroundImage src={AuthBg} style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.topLogo}>
        <DLogo width={48} height={48} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>ברוכים הבאים לדולפין!</Text>
          <Text style={styles.subtitle}>יומן הצלילה הרשמי של ישראל</Text>
        </View>

        <Text style={styles.description}>
          הסבר קצר על המערכת, היעוד/מטרה שלה ולמה ממש כדאי להשתמש בה.{'\n'}
          כמה מילים של ברוכים הבאים, כל דבר בסגנון שיהווה פתיח מסוים.
        </Text>

        <View style={styles.imageWrapper}>
          <Image source={onboardingPhoto} style={styles.image} resizeMode="cover" />
        </View>
      </View>

      {/* Pagination dots */}
      <View style={styles.wizard}>
        <TouchableOpacity onPress={() => router.push('/(auth)/language')}>
          <View style={styles.dot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/onboarding')}>
          <View style={[styles.dot, styles.active]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
          <View style={styles.dot} />
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  topLogo: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: [{ translateX: -24 }],
    zIndex: 20,
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: 160,
    transform: [{ translateX: -163.5 }],
    width: 327,
    flexDirection: 'column',
    gap: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  titleSection: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.24,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    lineHeight: typography.sizes.lg,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
    width: 280,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageWrapper: {
    position: 'relative',
    width: 327,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
    flexShrink: 0,
    ...shadows.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wizard: {
    position: 'absolute',
    left: '50%',
    bottom: 40,
    transform: [{ translateX: -50 }],
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center',
    zIndex: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: '#ffffff',
    opacity: 0.5,
  },
  active: {
    opacity: 1,
    width: 12,
    height: 12,
    ...shadows.sm,
  },
});
