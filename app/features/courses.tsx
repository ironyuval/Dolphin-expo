import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import BottomSheet from '@/components/shared/BottomSheet';
import CoursesFilter from '@/components/filters/CoursesFilter';
import CoursesSort from '@/components/filters/CoursesSort';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import SearchIcon from '@/assets/icons/ui/search.svg';
import FilterIcon from '@/assets/icons/ui/filter.svg';
import SortIcon from '@/assets/icons/ui/sort.svg';
const bgHistoryHeader = require('@/assets/backgrounds/bg-history-header.png');

const divingCourses = [
  {
    id: 1,
    name: 'קורס עוזר מדריך אילת, ישראל',
    location: 'במצומע',
    rating: 5,
    reviews: 34,
    price: '34 ק״מ ממך',
    img: 'https://via.placeholder.com/200x140?text=Course',
  },
  {
    id: 2,
    name: 'קורס עוזר מדריך אילת, ישראל',
    location: 'במצומע',
    rating: 5,
    reviews: 34,
    price: '34 ק״מ ממך',
    img: 'https://via.placeholder.com/200x140?text=Course',
  },
  {
    id: 3,
    name: 'התמחות צילום תת-ימי אילת, ישראל',
    location: 'במצומע',
    rating: 5,
    reviews: 34,
    price: '34 ק״מ ממך',
    img: 'https://via.placeholder.com/200x140?text=Course',
  },
];

const teachers = [
  {
    id: 1,
    name: 'אילנה ישראלי',
    location: 'אילת, ישראל',
    rating: 5,
    reviews: 34,
    price: '36 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=ilana',
  },
  {
    id: 2,
    name: 'אהרון אהרוני',
    location: 'אילת, ישראל',
    rating: 5,
    reviews: 34,
    price: '36 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=aharon',
  },
  {
    id: 3,
    name: 'אילנה ישראלי',
    location: 'אילת, ישראל',
    rating: 5,
    reviews: 34,
    price: '36 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=ilana2',
  },
];

const doctors = [
  {
    id: 1,
    name: 'ד״ר רעות ישראל',
    location: 'הרצליה, ישראל',
    rating: 5,
    reviews: 42,
    price: '16 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=reut',
  },
  {
    id: 2,
    name: 'ד״ר בני לוינסון',
    location: 'אילת, ישראל',
    rating: 5,
    reviews: 22,
    price: '36 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=beni',
  },
  {
    id: 3,
    name: 'ד״ר בני לוינסון',
    location: 'במצומע',
    rating: 5,
    reviews: 36,
    price: '36 ק״מ ממך',
    img: 'https://i.pravatar.cc/150?u=beni2',
  },
];

export default function CoursesAndTeachers() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [filterCount, setFilterCount] = useState(5);

  const renderStars = (count: number) => {
    return '★'.repeat(count);
  };

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
            <Text style={styles.title}>קורסים, מדריכים ורופאים</Text>
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
              placeholder="חיפוש לפי שם קורס/שם מדריך/מיקום"
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
            onPress={() => setShowSort(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.controlText}>מיון לפי</Text>
            <SortIcon width={16} height={16} fill={colors.primaryDarkest} />
          </TouchableOpacity>
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
        </View>

        {/* Courses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.push('/courses/all')} activeOpacity={0.7}>
              <Text style={styles.seeAll}>הצג הכל</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>קורסי צלילה</Text>
          </View>
          <ScrollView
            horizontal
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
            showsHorizontalScrollIndicator={false}
          >
            {divingCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => router.push(`/course/${course.id}`)}
                activeOpacity={0.7}
              >
                <View style={styles.courseImage}>
                  <Image source={{ uri: course.img }} style={styles.courseImageImg} />
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName} numberOfLines={2}>
                    {course.name}
                  </Text>
                  <View style={styles.courseRating}>
                    <Text style={styles.stars}>{renderStars(course.rating)}</Text>
                    <Text style={styles.ratingText}>{course.rating}</Text>
                  </View>
                  <View style={styles.courseFooter}>
                    <Text style={styles.courseDistance}>{course.price}</Text>
                    <Button variant="primary" size="sm" style={styles.courseBtn}>
                      קורס
                    </Button>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Instructors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.push('/instructors/all')} activeOpacity={0.7}>
              <Text style={styles.seeAll}>הצג הכל</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>מדריכי צלילה</Text>
          </View>
          <View style={styles.personList}>
            {teachers.map((teacher) => (
              <TouchableOpacity
                key={teacher.id}
                style={styles.personCard}
                onPress={() => router.push(`/instructor/${teacher.id}`)}
                activeOpacity={0.7}
              >
                <Button variant="primary" size="sm" style={styles.personBtn}>
                  מדריך
                </Button>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{teacher.name}</Text>
                  <Text style={styles.personLocation}>{teacher.location}</Text>
                  <View style={styles.personRating}>
                    <Text style={styles.stars}>{renderStars(teacher.rating)}</Text>
                    <Text style={styles.ratingText}>{teacher.rating}</Text>
                  </View>
                  <Text style={styles.personDistance}>{teacher.price}</Text>
                </View>
                <View style={styles.personAvatar}>
                  <Image source={{ uri: teacher.img }} style={styles.personAvatarImg} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Doctors Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TouchableOpacity onPress={() => router.push('/doctors/all')} activeOpacity={0.7}>
              <Text style={styles.seeAll}>הצג הכל</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>רופאי צלילה</Text>
          </View>
          <View style={styles.personList}>
            {doctors.map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={styles.personCard}
                onPress={() => router.push(`/doctor/${doctor.id}`)}
                activeOpacity={0.7}
              >
                <Button variant="primary" size="sm" style={styles.personBtn}>
                  רופא
                </Button>
                <View style={styles.personInfo}>
                  <Text style={styles.personName}>{doctor.name}</Text>
                  <Text style={styles.personLocation}>{doctor.location}</Text>
                  <View style={styles.personRating}>
                    <Text style={styles.stars}>{renderStars(doctor.rating)}</Text>
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                  </View>
                  <Text style={styles.personDistance}>{doctor.price}</Text>
                </View>
                <View style={styles.personAvatar}>
                  <Image source={{ uri: doctor.img }} style={styles.personAvatarImg} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <CoursesFilter
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={(count) => {
          // Handle filter application
          setShowFilter(false);
        }}
      />

      {/* Sort Modal */}
      <CoursesSort
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
    gap: spacing.xl,
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
  section: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  seeAll: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.lightBlue[100],
  },
  horizontalScroll: {
    marginHorizontal: -spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  horizontalScrollContent: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },
  courseCard: {
    minWidth: 200,
    flexShrink: 0,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.sm,
  },
  courseImage: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  courseImageImg: {
    width: '100%',
    height: '100%',
  },
  courseInfo: {
    padding: spacing.md,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  courseName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    lineHeight: 18,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    color: '#FFD700',
    fontSize: 12,
  },
  ratingText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  courseDistance: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.neutral.medium,
  },
  courseBtn: {
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
  },
  personList: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  personCard: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    ...shadows.sm,
  },
  personBtn: {
    paddingVertical: 6,
    paddingHorizontal: spacing.lg,
  },
  personAvatar: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    flexShrink: 0,
  },
  personAvatarImg: {
    width: '100%',
    height: '100%',
  },
  personInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    textAlign: 'right',
  },
  personName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  personLocation: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.neutral.medium,
  },
  personRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  personDistance: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 11,
    fontWeight: '400',
    color: colors.neutral.medium,
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
