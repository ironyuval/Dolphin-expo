import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanResponder } from 'react-native';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import BottomSheet from '@/components/shared/BottomSheet';
import DivingHistoryFilter from '@/components/filters/DivingHistoryFilter';
import SortingDivingHistory from '@/components/filters/SortingDivingHistory';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import FilterIcon from '@/assets/icons/ui/filter.svg';
import SortIcon from '@/assets/icons/ui/sort.svg';
import SearchIcon from '@/assets/icons/ui/search.svg';
const bgBannerHistory = require('@/assets/backgrounds/bg-banner-history.png');
const bgHistoryHeader = require('@/assets/backgrounds/bg-history-header.png');

const historyItems = [
  { id: 1, number: '5', club: 'צלילה חדשה ע"י מועדון מנטה', date: '01.04.2025', badge: 'D', country: 'il' },
  { id: 2, number: '4', club: 'ריף הרצליה הרצליה | ישראל', date: '03.03.2025', badge: '', country: 'il' },
];

export default function DivingHistory() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(1);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const slideContent = [
    {
      user: 'היי ישראל,',
      stats: 'הגיע הזמן לרענון!',
      main: 'עברו כבר 5 חודשים מאז הצלילה האחרונה שלך',
      btnText: 'קבע רענון עכשיו',
    },
    {
      user: 'היי ישראל,',
      stats: 'צללת 123 פעמים!',
      main: 'זה הזמן המושלם להתנסות בקורס לורם',
      btnText: 'לעץ קורסי הצלילה',
    },
    {
      user: 'היי ישראל,',
      stats: 'צברת המון ניסיון!',
      main: 'חשבת פעם על הסמכת Rescue Diver?',
      btnText: 'פרטים נוספים',
    },
  ];

  const [panResponder] = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderRelease: (_, gestureState) => {
        const minSwipeDistance = 50;
        if (gestureState.dx > minSwipeDistance && activeSlide > 0) {
          setActiveSlide(prev => prev - 1);
        } else if (gestureState.dx < -minSwipeDistance && activeSlide < 2) {
          setActiveSlide(prev => prev + 1);
        }
      },
    })
  );

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Header section */}
      <View style={styles.header}>
        <View style={styles.photoWrapper}>
          <ImageBackground source={bgHistoryHeader} style={styles.headerPhoto} resizeMode="cover" />
        </View>
        <TouchableOpacity
          style={styles.settingsWrapper}
          onPress={() => router.push('/(auth)/language')}
          activeOpacity={0.7}
        >
          <SettingsIcon width={20} height={20} fill="#ffffff" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>היסטוריית צלילה</Text>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Controls: Filter, Sort, Search */}
        <View style={styles.controls}>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setShowFilter(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterCount}>5</Text>
              <Text style={styles.btnText}>סינון לפי</Text>
              <FilterIcon width={16} height={16} fill={colors.primaryDarkest} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => setShowSort(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>מיון לפי</Text>
              <SortIcon width={16} height={16} fill={colors.primaryDarkest} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="חפש לפי שם מועדון/פרטנר צלילה/תאריך צלילה"
              placeholderTextColor="rgba(1, 0, 37, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              textAlign="right"
            />
            <SearchIcon width={20} height={20} fill={colors.neutral.medium} />
          </View>
        </View>

        {/* Promo / Incentive Card - Swipeable */}
        {isBannerVisible && (
          <View
            style={styles.incentiveCard}
            {...panResponder.panHandlers}
          >
            <ImageBackground source={bgBannerHistory} style={styles.incentiveBg} resizeMode="cover">
              <TouchableOpacity
                style={styles.closeCard}
                onPress={() => setIsBannerVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.closeCardText}>×</Text>
              </TouchableOpacity>
              <View style={styles.incentiveContent}>
                <Text style={styles.incentiveUser}>{slideContent[activeSlide].user}</Text>
                <Text style={styles.incentiveStats}>{slideContent[activeSlide].stats}</Text>
                <Text style={styles.incentiveMain}>{slideContent[activeSlide].main}</Text>
                <Button variant="white" style={styles.incentiveBtn} onPress={() => {}}>
                  {slideContent[activeSlide].btnText}
                </Button>
              </View>
              <View style={styles.paginationDots}>
                {[0, 1, 2].map((idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.dot, activeSlide === idx && styles.activeDot]}
                    onPress={() => setActiveSlide(idx)}
                    activeOpacity={0.7}
                  />
                ))}
              </View>
            </ImageBackground>
          </View>
        )}

        {/* Results List */}
        <View style={styles.historyList}>
          {historyItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.historyItem}
              onPress={() => router.push('/diving/log-view')}
              activeOpacity={0.7}
            >
              <View style={styles.itemNumber}>
                <Text style={styles.itemNumText}>{item.number}</Text>
              </View>

              <View style={styles.itemInfo}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemClub}>{item.club}</Text>
                  <Text style={styles.separator}>|</Text>
                  <View style={styles.itemFlagWrapper}>
                    <Image
                      source={{ uri: `https://flagcdn.com/w40/${item.country}.png` }}
                      style={styles.itemFlag}
                    />
                  </View>
                </View>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemDate}>{item.date}</Text>
                  <Text style={styles.editIcon}>✏️</Text>
                </View>
              </View>

              <View style={styles.itemBadge}>
                {item.badge ? (
                  <View style={styles.dolphinBadge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : (
                  <View style={styles.itemThumbnail} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNav />

      {/* Filter and Sort Bottom Sheets */}
      <DivingHistoryFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
      />
      <SortingDivingHistory
        isOpen={showSort}
        onClose={() => setShowSort(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  header: {
    height: 200,
    position: 'relative',
    zIndex: 1,
  },
  photoWrapper: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  headerPhoto: {
    width: '100%',
    height: '100%',
  },
  settingsWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: colors.white[100],
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.lg,
    ...shadows.md,
    zIndex: 10,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '800',
    color: colors.primaryDarkest,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.xl,
    paddingTop: spacing.xl,
    flexDirection: 'column',
    gap: spacing.xl,
  },
  controls: {
    flexDirection: 'column',
    gap: spacing.lg,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  filterBtn: {
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.1)',
    height: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  filterCount: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.lightBlue[100],
  },
  btnText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.1)',
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  incentiveCard: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  incentiveBg: {
    width: '100%',
    height: '100%',
  },
  closeCard: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeCardText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
  },
  incentiveContent: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  incentiveUser: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  incentiveStats: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  incentiveMain: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
  },
  incentiveBtn: {
    marginTop: spacing.sm,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: borderRadius.full,
    backgroundColor: '#ffffff',
    opacity: 0.5,
  },
  activeDot: {
    opacity: 1,
    width: 8,
    height: 8,
  },
  historyList: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.sm,
    alignItems: 'center',
    gap: spacing.md,
  },
  itemNumber: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.lightBlue[15],
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNumText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.lightBlue[100],
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.xs,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemClub: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.primaryDarkest,
    flex: 1,
  },
  separator: {
    fontSize: typography.sizes.md,
    color: colors.neutral.medium,
  },
  itemFlagWrapper: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  itemFlag: {
    width: '100%',
    height: '100%',
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemDate: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.neutral.medium,
  },
  editIcon: {
    fontSize: 14,
  },
  itemBadge: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dolphinBadge: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.lightBlue[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: '#ffffff',
  },
  itemThumbnail: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.offWhite[100],
  },
  bottomSheetContent: {
    padding: spacing.xl,
  },
  bottomSheetTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
