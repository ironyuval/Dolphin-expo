import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, PanResponder } from 'react-native';
import { useRouter } from 'expo-router';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import BackgroundImage from '@/components/shared/BackgroundImage';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import AuthWelcomeBg from '@/assets/backgrounds/auth-welcome-bg.svg';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import GoogleIcon from '@/assets/icons/social/icon-google.png';
import AppleIcon from '@/assets/icons/social/apple.svg';
import FishGroup1 from '@/assets/decorative/fish-group-1.svg';
import FishGroup2 from '@/assets/decorative/fish-group-2.svg';

export default function Welcome() {
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
          router.push('/(auth)/onboarding');
        }
      },
    })
  );

  return (
    <BackgroundImage src={AuthWelcomeBg} style={styles.container} {...panResponder.panHandlers}>
      <StatusBar variant="light" />

      <TouchableOpacity
        style={styles.settingsWrapper}
        onPress={() => router.push('/(auth)/language')}
        activeOpacity={0.7}
      >
        <SettingsIcon width={20} height={20} fill="#ffffff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>ברוכים הבאים לדולפין!</Text>

        <View style={styles.buttonGroup}>
          <Button variant="white" fullWidth onPress={() => router.push('/(auth)/register')}>
            אני רוצה להרשם
          </Button>
          <Button variant="white" fullWidth onPress={() => router.push('/(auth)/login')}>
            יש לי משתמש קיים
          </Button>
        </View>

        <View style={styles.dividerSection}>
          <View style={styles.divider} />

          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>או המשך עם</Text>
            <View style={styles.socialButtons}>
              <Button variant="social">
                <Image source={GoogleIcon} style={styles.socialIcon} />
              </Button>
              <Button variant="apple">
                <AppleIcon width={24} height={24} fill="#ffffff" />
              </Button>
            </View>
          </View>
        </View>
      </View>

      {/* Background Decorative Elements */}
      <View style={styles.fishGroup1}>
        <FishGroup1 width={120} height={80} opacity={0.12} />
      </View>
      <View style={styles.fishGroup2}>
        <FishGroup2 width={100} height={60} opacity={0.1} />
      </View>

      {/* Pagination dots */}
      <View style={styles.wizard}>
        <TouchableOpacity onPress={() => router.push('/(auth)/language')}>
          <View style={styles.dot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/onboarding')}>
          <View style={styles.dot} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
          <View style={[styles.dot, styles.active]} />
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsWrapper: {
    position: 'absolute',
    left: 21,
    top: 58,
    width: 32,
    height: 32,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
  },
  content: {
    width: 327,
    flexDirection: 'column',
    gap: spacing.xl,
    alignItems: 'center',
    zIndex: 10,
    marginTop: 40,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
    width: '100%',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  buttonGroup: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  dividerSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.lg,
    alignItems: 'center',
  },
  socialTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  fishGroup1: {
    position: 'absolute',
    top: '40%',
    right: 10,
    width: 120,
    height: 80,
    zIndex: 1,
  },
  fishGroup2: {
    position: 'absolute',
    bottom: '20%',
    right: -20,
    width: 100,
    height: 60,
    zIndex: 1,
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
    ...colors.shadows.sm,
  },
});
