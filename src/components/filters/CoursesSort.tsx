import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SortIcon from '@/assets/icons/ui/sort.svg';

interface CoursesSortProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sort: { sortBy: string | null; sortDirection: string }) => void;
}

export default function CoursesSort({ isOpen, onClose, onApply }: CoursesSortProps) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleClearAll = () => {
    setSortBy(null);
    setSortDirection('asc');
  };

  const handleApply = () => {
    onApply({ sortBy, sortDirection });
  };

  const selectSort = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDirection(direction);
  };

  const previewCourses = [
    { id: 1, name: 'קורס עוזר מדריך אילת, ישראל', rating: 5, price: '34 ק״מ ממך', img: 'https://via.placeholder.com/80x60?text=Course' },
    { id: 2, name: 'קורס עוזר מדריך אילת, ישראל', rating: 5, price: '34 ק״מ ממך', img: 'https://via.placeholder.com/80x60?text=Course' },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.tabBtn}>ביטול</Text>
          </TouchableOpacity>
          <Text style={styles.title}>מיון לפי</Text>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.tabBtn}>נקה הכל</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.applySection}>
          <Button variant="primary" fullWidth onPress={handleApply}>
            החל מיון
          </Button>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Proximity */}
          <View style={styles.sortOption}>
            <View style={styles.sortIcons}>
              <TouchableOpacity
                style={[
                  styles.sortBtn,
                  sortBy === 'proximity' && sortDirection === 'asc' && styles.sortBtnActive,
                ]}
                onPress={() => selectSort('proximity', 'asc')}
                activeOpacity={0.7}
              >
                <SortIcon width={16} height={16} fill={colors.primaryDarkest} style={styles.sortIconUp} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortBtn,
                  sortBy === 'proximity' && sortDirection === 'desc' && styles.sortBtnActive,
                ]}
                onPress={() => selectSort('proximity', 'desc')}
                activeOpacity={0.7}
              >
                <SortIcon width={16} height={16} fill={colors.primaryDarkest} style={styles.sortIconDown} />
              </TouchableOpacity>
            </View>
            <Text style={styles.sortLabel}>קרבה</Text>
          </View>

          {/* Preview Cards for Proximity */}
          {sortBy === 'proximity' && (
            <View style={styles.previewCards}>
              {previewCourses.map((course) => (
                <View key={course.id} style={styles.previewCard}>
                  <Image source={{ uri: course.img }} style={styles.previewImage} />
                  <View style={styles.previewInfo}>
                    <Text style={styles.previewName}>{course.name}</Text>
                    <View style={styles.previewRating}>
                      <Text style={styles.stars}>★★★★★</Text>
                    </View>
                    <Text style={styles.previewPrice}>{course.price}</Text>
                  </View>
                  <Button variant="primary" size="sm" style={styles.previewBtn}>
                    קורס
                  </Button>
                </View>
              ))}
            </View>
          )}

          {/* Rating */}
          <View style={styles.sortOption}>
            <View style={styles.sortIcons}>
              <TouchableOpacity
                style={[
                  styles.sortBtn,
                  sortBy === 'rating' && sortDirection === 'asc' && styles.sortBtnActive,
                ]}
                onPress={() => selectSort('rating', 'asc')}
                activeOpacity={0.7}
              >
                <SortIcon width={16} height={16} fill={colors.primaryDarkest} style={styles.sortIconUp} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortBtn,
                  sortBy === 'rating' && sortDirection === 'desc' && styles.sortBtnActive,
                ]}
                onPress={() => selectSort('rating', 'desc')}
                activeOpacity={0.7}
              >
                <SortIcon width={16} height={16} fill={colors.primaryDarkest} style={styles.sortIconDown} />
              </TouchableOpacity>
            </View>
            <Text style={styles.sortLabel}>דירוג</Text>
          </View>

          {/* Preview Cards for Rating */}
          {sortBy === 'rating' && (
            <View style={styles.previewCards}>
              {previewCourses.map((course) => (
                <View key={course.id} style={styles.previewCard}>
                  <Image source={{ uri: course.img }} style={styles.previewImage} />
                  <View style={styles.previewInfo}>
                    <Text style={styles.previewName}>{course.name}</Text>
                    <View style={styles.previewRating}>
                      <Text style={styles.stars}>★★★★★</Text>
                    </View>
                    <Text style={styles.previewPrice}>{course.price}</Text>
                  </View>
                  <Button variant="primary" size="sm" style={styles.previewBtn}>
                    קורס
                  </Button>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
    backgroundColor: colors.primaryDarkest,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.white[100],
  },
  tabBtn: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.white[100],
  },
  applySection: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  sortIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.offWhite[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortBtnActive: {
    backgroundColor: colors.lightBlue[100],
  },
  sortIconUp: {
    transform: [{ rotate: '180deg' }],
  },
  sortIconDown: {
    transform: [{ rotate: '0deg' }],
  },
  sortLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
    flex: 1,
    textAlign: 'right',
  },
  previewCards: {
    flexDirection: 'column',
    gap: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.offWhite[100],
    ...shadows.sm,
  },
  previewImage: {
    width: 80,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.offWhite[100],
  },
  previewInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.xs,
  },
  previewName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '500',
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  previewRating: {
    flexDirection: 'row',
  },
  stars: {
    fontSize: typography.sizes.sm,
    color: '#FFD700',
  },
  previewPrice: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xs,
    color: colors.neutral.medium,
    textAlign: 'right',
  },
  previewBtn: {
    minWidth: 60,
  },
});
