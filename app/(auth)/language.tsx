import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import BackgroundImage from '@/components/shared/BackgroundImage';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import AuthBg from '@/assets/backgrounds/auth-main-bg.svg';

export default function LanguagePicking() {
  const [selectedLanguage, setSelectedLanguage] = useState<'he' | 'en'>('he');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/(auth)/onboarding');
  };

  return (
    <View style={styles.container}>
      <BackgroundImage src={AuthBg}>
        <StatusBar variant="light" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Choose your preferred language</Text>

        <View style={styles.languageOptions}>
          <TouchableOpacity
            style={[
              styles.field,
              selectedLanguage === 'he' ? styles.selected : styles.unselected,
            ]}
            onPress={() => setSelectedLanguage('he')}
            activeOpacity={0.8}
          >
            <View style={styles.flagContainer}>
              <Image
                source={{ uri: 'https://flagcdn.com/w160/il.png' }}
                style={styles.flagImage}
              />
            </View>
            <View style={styles.contentInner}>
              <Text style={styles.languageText}>עברית (HEB)</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.field,
              selectedLanguage === 'en' ? styles.selected : styles.unselected,
            ]}
            onPress={() => setSelectedLanguage('en')}
            activeOpacity={0.8}
          >
            <View style={styles.flagContainer}>
              <Image
                source={{ uri: 'https://flagcdn.com/w160/us.png' }}
                style={styles.flagImage}
              />
            </View>
            <View style={styles.contentInner}>
              <Text style={styles.languageText}>English (EN)</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Pagination dots */}
      <View style={styles.wizard}>
        <View style={[styles.dot, styles.active]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      </BackgroundImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    position: 'absolute',
    left: '50%',
    top: 128,
    transform: [{ translateX: -163.5 }],
    width: 327,
    alignItems: 'center',
    gap: 20,
    zIndex: 10,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  languageOptions: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  field: {
    width: '100%',
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: colors.lightBlue[100],
    ...shadows.md,
  },
  unselected: {
    opacity: 0.7,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  contentInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primaryDarkest,
  },
  flagContainer: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    ...shadows.sm,
  },
  flagImage: {
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
    gap: 8,
    alignItems: 'center',
    zIndex: 100,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: '#ffffff',
    opacity: 0.5,
  },
  active: {
    opacity: 1,
    width: 10,
    height: 10,
  },
  fishGroup1: {
    position: 'absolute',
    top: 200,
    right: -30,
    width: 120,
    height: 80,
    zIndex: 1,
  },
  fishGroup2: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    width: 100,
    height: 60,
    zIndex: 1,
  },
});
