import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import EmergencyIcon from '@/assets/icons/emergency.svg';
import EyeIcon from '@/assets/icons/eye.svg';
import UploadIcon from '@/assets/icons/upload.svg';
const bgHistoryHeader = require('@/assets/backgrounds/bg-history-header.png');

const documentCategories = [
  {
    id: 'insurance',
    title: 'ביטוחי צלילה',
    items: [
      { id: 1, title: 'ביטוח צלילה יומי', date: '01.01.2025' },
      { id: 2, title: 'ביטוח צלילה דו-יומי', date: '12.04.2024-14.04.2024' },
      { id: 3, title: 'ביטוח צלילה שנתי', date: '01.01.2023-01.01.2024' },
    ],
  },
  {
    id: 'license',
    title: 'רשיון צלילה',
    items: [
      { id: 1, title: 'תעודת PADI', date: '01.01.2025' },
      { id: 2, title: 'תעודה X', date: '12.04.2024' },
    ],
  },
  {
    id: 'certificates',
    title: 'תעודות התמחות',
    items: [
      { id: 1, title: 'התמחות סקוטרים', date: '01.01.2025' },
      { id: 2, title: 'התמחות צילום', date: '12.04.2024' },
    ],
  },
  {
    id: 'other',
    title: 'אחר',
    items: [
      { id: 1, title: 'לורם איפסום', date: '01.01.2024' },
      { id: 2, title: 'חוזה צלילה טיול לריו- ברזיל', date: '12.04.2024' },
    ],
  },
];

export default function Documents() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedCategories, setExpandedCategories] = useState({
    insurance: true,
    license: true,
    certificates: true,
    other: true,
  });

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id as keyof typeof prev] }));
  };

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Header with Background */}
      <View style={styles.header}>
        <ImageBackground source={bgHistoryHeader} style={styles.headerBg} resizeMode="cover">
          <TouchableOpacity
            style={styles.emergencyWrapper}
            onPress={() => router.push('/features/emergency')}
            activeOpacity={0.7}
          >
            <EmergencyIcon width={26} height={26} fill="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsWrapper}
            onPress={() => router.push('/(auth)/language')}
            activeOpacity={0.7}
          >
            <SettingsIcon width={20} height={20} fill="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.mainTitle}>המסמכים שלי</Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <Button variant="primary" fullWidth style={styles.addBtn}>
          הוספת מסמך
        </Button>

        <View style={styles.list}>
          {documentCategories.map((category) => (
            <View key={category.id} style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleCategory(category.id)}
                activeOpacity={0.7}
              >
                <View style={styles.chevronWrapper}>
                  <ChevronDownIcon
                    width={16}
                    height={8}
                    fill={colors.primaryDarkest}
                    style={[
                      styles.chevron,
                      !expandedCategories[category.id as keyof typeof expandedCategories] &&
                        styles.collapsed,
                    ]}
                  />
                </View>
                <Text style={styles.sectionTitle}>{category.title}</Text>
              </TouchableOpacity>

              {expandedCategories[category.id as keyof typeof expandedCategories] && (
                <View style={styles.itemsContainer}>
                  <View style={styles.items}>
                    {category.items.map((item) => (
                      <View key={item.id} style={styles.card}>
                        <View style={styles.cardIcons}>
                          <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => {}}
                            activeOpacity={0.7}
                          >
                            <EyeIcon width={15} height={10} fill={colors.primaryDarkest} />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => {}}
                            activeOpacity={0.7}
                          >
                            <UploadIcon width={15} height={12} fill={colors.primaryDarkest} />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.cardContent}>
                          <Text style={styles.cardTitle}>{item.title}</Text>
                          <Text style={styles.cardDate}>{item.date}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
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
    height: 179,
    position: 'relative',
  },
  headerBg: {
    width: '100%',
    height: '100%',
  },
  emergencyWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  settingsWrapper: {
    position: 'absolute',
    top: 20,
    right: 24,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: -18,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: colors.white[100],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.lg,
    ...shadows.md,
    zIndex: 10,
  },
  mainTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingTop: 48,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: 327,
    alignSelf: 'center',
  },
  addBtn: {
    marginBottom: spacing['2xl'],
    height: 48,
  },
  list: {
    flexDirection: 'column',
    gap: 25,
  },
  section: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.lg,
    width: '100%',
  },
  chevronWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  collapsed: {
    transform: [{ rotate: '180deg' }],
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  itemsContainer: {
    overflow: 'hidden',
  },
  items: {
    flexDirection: 'column',
    gap: spacing.sm,
    paddingTop: 0,
  },
  card: {
    backgroundColor: colors.offWhite[100],
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  cardIcons: {
    flexDirection: 'column',
    gap: spacing.sm,
    width: 15,
    flexShrink: 0,
  },
  iconBtn: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 0,
    textAlign: 'right',
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '400',
    color: colors.primaryDarkest,
    lineHeight: 19,
  },
  cardDate: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    lineHeight: 17,
  },
});
