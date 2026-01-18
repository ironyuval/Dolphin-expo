import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SortIcon from '@/assets/icons/ui/sort.svg';

interface DivingClubsSortProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sort: { sortBy: string | null; sortDirection: string }) => void;
}

export default function DivingClubsSort({ isOpen, onClose, onApply }: DivingClubsSortProps) {
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

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelBtn}>ביטול</Text>
          </TouchableOpacity>
          <Text style={styles.title}>מיון לפי</Text>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.clearAll}>נקה הכל</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Proximity */}
          <View style={styles.sortOption}>
            <Text style={styles.sortLabel}>קרבה</Text>
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
          </View>

          {/* Rating */}
          <View style={styles.sortOption}>
            <Text style={styles.sortLabel}>דירוג</Text>
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
          </View>
        </View>

        <View style={styles.footer}>
          <Button variant="primary" fullWidth onPress={handleApply}>
            החל מיון
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  cancelBtn: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  clearAll: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  content: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    flexDirection: 'column',
    gap: spacing.xl,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  sortIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortBtn: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.offWhite[100],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white[100],
  },
  sortBtnActive: {
    backgroundColor: colors.lightBlue[100],
    borderColor: colors.lightBlue[100],
  },
  sortIconUp: {
    transform: [{ rotate: '180deg' }],
  },
  sortIconDown: {
    transform: [{ rotate: '0deg' }],
  },
  footer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.offWhite[100],
  },
});
