import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import BottomSheet from '@/components/shared/BottomSheet';
import DivingClubsFilter from '@/components/filters/DivingClubsFilter';
import DivingClubsSort from '@/components/filters/DivingClubsSort';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import SearchIcon from '@/assets/icons/ui/search.svg';
import FilterIcon from '@/assets/icons/ui/filter.svg';
import SortIcon from '@/assets/icons/ui/sort.svg';
const bgHistoryHeader = require('@/assets/backgrounds/bg-history-header.png');

const clubsData = [
  {
    id: 1,
    name: 'מנטה אילת',
    location: 'אילת, ישראל',
    count: 'צללת כאן 32 פעמים',
    distance: '3.4 ק״מ ממך',
    logo: 'https://via.placeholder.com/64?text=M',
  },
  {
    id: 2,
    name: 'מועדון סנובה',
    location: 'אילת, ישראל',
    count: 'לא צללת כאן עדיין',
    distance: '3.6 ק״מ ממך',
    logo: 'https://via.placeholder.com/64?text=S',
  },
  {
    id: 3,
    name: 'סי תל אביב',
    location: 'ת״א, ישראל',
    count: 'לא צללת כאן עדיין',
    distance: '1.4 ק״מ ממך',
    logo: 'https://via.placeholder.com/64?text=C',
  },
  {
    id: 4,
    name: 'ריף הרצליה',
    location: 'הרצליה, ישראל',
    count: 'צללת כאן 42 פעמים',
    distance: '4.2 ק״מ ממך',
    logo: 'https://via.placeholder.com/64?text=R',
  },
];

export default function DivingClubs() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Header */}
      <View style={styles.header}>
        <ImageBackground source={bgHistoryHeader} style={styles.headerBg} resizeMode="cover">
          <TouchableOpacity
            style={styles.settingsWrapper}
            onPress={() => router.push('/(auth)/language')}
            activeOpacity={0.7}
          >
            <SettingsIcon width={20} height={20} fill="#ffffff" />
          </TouchableOpacity>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>מועדוני צלילה</Text>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <SearchIcon width={20} height={20} fill={colors.neutral.medium} />
            <TextInput
              style={styles.searchInput}
              placeholder="חיפוש לפי שם מועדון/מיקום"
              placeholderTextColor={colors.neutral.medium}
              value={searchQuery}
              onChangeText={setSearchQuery}
              textAlign="right"
            />
          </View>
        </View>

        {/* Filter and Sort Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setShowFilter(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.controlText}>סינון לפי</Text>
            <View style={styles.iconWithBadge}>
              <FilterIcon width={16} height={16} fill={colors.primaryDarkest} />
              {filterCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{filterCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setShowSort(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.controlText}>מיון לפי</Text>
            <SortIcon width={16} height={16} fill={colors.primaryDarkest} />
          </TouchableOpacity>
        </View>

        {/* Clubs List */}
        <View style={styles.clubsList}>
          {clubsData.map((club) => (
            <TouchableOpacity
              key={club.id}
              style={styles.clubCard}
              onPress={() => router.push(`/club/${club.id}`)}
              activeOpacity={0.7}
            >
              <View style={styles.clubLogo}>
                <Image source={{ uri: club.logo }} style={styles.clubLogoImg} />
              </View>
              <View style={styles.clubInfo}>
                <View style={styles.clubHeader}>
                  <Text style={styles.clubName}>{club.name}</Text>
                  <Text style={styles.clubLocation}>{club.location}</Text>
                </View>
                <Text style={styles.clubCount}>{club.count}</Text>
                <View style={styles.clubFooter}>
                  <Text style={styles.distance}>{club.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <DivingClubsFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(count) => {
          setFilterCount(count);
          setShowFilter(false);
        }}
      />

      {/* Sort Modal */}
      <DivingClubsSort
        isOpen={showSort}
        onClose={() => setShowSort(false)}
        onApply={(sort) => {
          // Handle sort application
          setShowSort(false);
        }}
      />

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
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 48,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: 375,
    alignSelf: 'center',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  searchWrapper: {
    width: '100%',
  },
  searchBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'flex-end',
  },
  controlBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: 0,
  },
  controlText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  iconWithBadge: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    left: -8,
    backgroundColor: colors.primaryDarkest,
    width: 18,
    height: 18,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 10,
    fontWeight: '700',
    color: colors.white[100],
  },
  clubsList: {
    flexDirection: 'column',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  clubCard: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    ...shadows.sm,
  },
  clubLogo: {
    flexShrink: 0,
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    backgroundColor: colors.offWhite[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubLogoImg: {
    width: '100%',
    height: '100%',
  },
  clubInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    textAlign: 'right',
  },
  clubHeader: {
    flexDirection: 'column',
    gap: 2,
  },
  clubName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  clubLocation: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.neutral.medium,
  },
  clubCount: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 13,
    fontWeight: '400',
    color: colors.neutral.medium,
    marginTop: 4,
  },
  clubFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  distance: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.neutral.medium,
    textAlign: 'right',
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
