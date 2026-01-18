import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
const gallery4 = require('@/assets/photos/gallery-4.png');
const gallery5 = require('@/assets/photos/gallery-5.png');
const gallery6 = require('@/assets/photos/gallery-6.png');

const diveData = {
  location: 'ריף הדולפינים-אילת, ישראל',
  subtitle: 'צלילה מס\' 2 - 01.01.2025',
  buddy: 'ישראל ישראלי + לורם איפסום',
  timeInfo: '12:00-13:01 | 43 ד"ק זמן תחתית',
  weightInfo: '6-6 lb',
  safetyStop: true,
  description: 'לורם איפסום דולור סנט אימט.',
  images: [gallery4, gallery5, gallery6, gallery4, gallery5],
};

export default function DivingLogView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingBottom: 100 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.settingsWrapper}
          onPress={() => router.push('/(auth)/language')}
          activeOpacity={0.7}
        >
          <SettingsIcon width={26} height={26} fill={colors.primaryDarkest} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.title}>{diveData.location}</Text>
          <Text style={styles.subtitle}>{diveData.subtitle}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <ScrollView
          horizontal
          style={styles.galleryWrapper}
          contentContainerStyle={styles.galleryScroll}
          showsHorizontalScrollIndicator={false}
        >
          {diveData.images.map((img, idx) => (
            <View key={idx} style={styles.galleryItem}>
              <Image source={img} style={styles.galleryImage} resizeMode="cover" />
            </View>
          ))}
        </ScrollView>

        {/* Info Rows */}
        <View style={styles.infoContent}>
          <View style={styles.infoRow}>
            <Text style={styles.rowIcon}>👤</Text>
            <Text style={styles.rowText}>{diveData.buddy}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.rowIcon}>🕒</Text>
            <Text style={styles.rowText}>{diveData.timeInfo}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.rowIcon}>⚖️</Text>
            <View style={styles.weightGroup}>
              <Text style={styles.rowText}>{diveData.weightInfo}</Text>
              <View style={styles.safetyStop}>
                <Text style={styles.safetyLabel}>חניית בטיחות</Text>
                <View style={styles.checkboxMock}>
                  <Text style={styles.checkboxText}>✓</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.rowIcon}>📄</Text>
            <Text style={styles.rowText}>{diveData.description}</Text>
          </View>

          <View style={styles.signatureSection}>
            <Text style={styles.signatureLabel}>חתימה דיגיטלית</Text>
            <View style={styles.signatureBox}>
              <Text style={styles.signatureMock}>lu</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button variant="white" style={styles.exitBtn} onPress={() => router.push('/diving/history')}>
            יציאה
          </Button>
          <Button variant="primary" style={styles.shareBtn} onPress={() => {}}>
            שיתוף
          </Button>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white[100],
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    position: 'relative',
    alignItems: 'center',
  },
  settingsWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerTitles: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 21,
    width: '100%',
    maxWidth: 327,
    alignSelf: 'center',
    paddingBottom: spacing['2xl'],
  },
  galleryWrapper: {
    marginBottom: spacing.xl,
    width: '100%',
  },
  galleryScroll: {
    flexDirection: 'row',
    gap: 5,
    paddingBottom: spacing.sm,
  },
  galleryItem: {
    flexShrink: 0,
    width: 61,
    height: 60,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.offWhite[100],
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  infoContent: {
    flexDirection: 'column',
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    justifyContent: 'flex-start',
  },
  rowIcon: {
    fontSize: 20,
    width: 24,
    textAlign: 'center',
  },
  rowText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    lineHeight: 20,
    textAlign: 'right',
    flex: 1,
  },
  weightGroup: {
    flexDirection: 'column',
    gap: spacing.md,
    flex: 1,
  },
  safetyStop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  safetyLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
  },
  checkboxMock: {
    width: 19,
    height: 19,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.lightBlue[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxText: {
    color: colors.white[100],
    fontSize: 12,
    fontWeight: '700',
  },
  signatureSection: {
    flexDirection: 'column',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  signatureLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  signatureBox: {
    width: '100%',
    height: 60,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.offWhite[100],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.lighter,
  },
  signatureMock: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    color: colors.primaryDarkest,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  exitBtn: {
    flex: 1,
  },
  shareBtn: {
    flex: 1,
  },
});
