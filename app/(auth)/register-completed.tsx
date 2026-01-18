import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SupportIcon from '@/assets/icons/ui/support.svg';
import FishGroup1 from '@/assets/decorative/fish-group-1.svg';
import FishGroup2 from '@/assets/decorative/fish-group-2.svg';
const authCompletedBg = require('@/assets/backgrounds/auth-completed-bg.png');

export default function RegisterCompleted() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={authCompletedBg} style={styles.screen} resizeMode="cover">
      <StatusBar variant="light" />

      <TouchableOpacity
        style={styles.supportIconWrapper}
        onPress={() => {}}
        activeOpacity={0.7}
      >
        <SupportIcon width={20} height={20} fill="#ffffff" />
      </TouchableOpacity>

      <View style={[styles.content, { paddingTop: 128 + insets.top, paddingBottom: 40 + insets.bottom }]}>
        <Text style={styles.englishTitle}>It's time to dive in!</Text>

        <View style={styles.hebrewText}>
          <Text style={styles.hebrewParagraph}>
            ההרשמה הושלמה! עכשיו כשנרשמת למערכת אפשר להנות מ....טקסט כלשהו מזמין
            שיקבלו הנרשמים לאחר הרשמה מוצלחת. חשוב לציין שפרטי ההרשמה/מייל מאמת
            נשלח לכתובת המייל שהוזנה וכו' וכעת הם מועברים לפרופיל שלהם בו ניתן
            לעדכן נתוני פרופיל רלוונטים
          </Text>
        </View>

        <Button
          variant="white"
          fullWidth
          onPress={() => router.push('/profile/setup-1')}
          style={styles.ctaButton}
        >
          מתחילים!
        </Button>
      </View>

      {/* Background Decorative Elements */}
      <View style={styles.fishGroup1}>
        <FishGroup1 width={120} height={80} opacity={0.15} />
      </View>
      <View style={styles.fishGroup2}>
        <FishGroup2 width={100} height={60} opacity={0.12} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  supportIconWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    zIndex: 100,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 327,
    marginHorizontal: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
    textAlign: 'center',
  },
  englishTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 36,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  hebrewText: {
    width: '100%',
    maxWidth: 327,
    marginBottom: spacing['4xl'],
    textAlign: 'center',
  },
  hebrewParagraph: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    lineHeight: 22,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaButton: {
    maxWidth: 327,
  },
  fishGroup1: {
    position: 'absolute',
    top: '15%',
    right: -20,
    width: 120,
    height: 80,
    zIndex: 1,
  },
  fishGroup2: {
    position: 'absolute',
    bottom: '25%',
    left: 20,
    width: 100,
    height: 60,
    zIndex: 1,
  },
});
