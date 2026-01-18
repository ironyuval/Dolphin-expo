import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import Toggle from '@/components/shared/Toggle';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SearchIcon from '@/assets/icons/ui/search.svg';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';

interface CoursesFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
}

export default function CoursesFilter({ isOpen, onClose, onApply }: CoursesFilterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    instructors: true,
    courses: true,
    doctors: false,
  });
  const [locationQuery, setLocationQuery] = useState('');
  const [ratingQuery, setRatingQuery] = useState('');
  const [divesQuery, setDivesQuery] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleFilter = (key: 'instructors' | 'courses' | 'doctors') => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearAll = () => {
    setFilters({ instructors: false, courses: false, doctors: false });
    setLocationQuery('');
    setRatingQuery('');
    setDivesQuery('');
  };

  const handleApply = () => {
    const count = Object.values(filters).filter(Boolean).length;
    onApply(count);
  };

  const locationSuggestions = ['לורם איפסום', 'לורם איפסום', 'לורם איפסום', 'לורם איפסום', 'לורם איפסום'];
  const ratingPills = ['★', '★★', '★★★', '★★★★', '★★★★★'];
  const divesPills = ['0-50', '51-100', '101-200', '201-500', '500+'];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.tabBtn}>ביטול</Text>
          </TouchableOpacity>
          <Text style={styles.title}>סינון לפי</Text>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.tabBtn}>נקה הכל</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.applySection}>
          <Button variant="primary" fullWidth onPress={handleApply}>
            החל סינון
          </Button>
        </View>

        <ScrollView style={styles.accordion} showsVerticalScrollIndicator={false}>
          {/* Instructors Toggle */}
          <View style={styles.filterItem}>
            <Toggle
              active={filters.instructors}
              badge={5}
              onPress={() => toggleFilter('instructors')}
            />
            <Text style={styles.filterLabel}>מדריכי צלילה</Text>
          </View>

          {/* Courses Toggle */}
          <View style={styles.filterItem}>
            <Toggle
              active={filters.courses}
              badge={5}
              onPress={() => toggleFilter('courses')}
            />
            <Text style={styles.filterLabel}>קורסי צלילה</Text>
          </View>

          {/* Doctors Toggle */}
          <View style={styles.filterItem}>
            <Toggle
              active={filters.doctors}
              onPress={() => toggleFilter('doctors')}
            />
            <Text style={styles.filterLabel}>רופאי צלילה</Text>
          </View>

          {/* Location Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('location')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'location' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>מיקום (עיר)</Text>
            </TouchableOpacity>
            {expandedSection === 'location' && (
              <View style={styles.accordionContent}>
                <View style={styles.searchInput}>
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                  <TextInput
                    style={styles.searchInputText}
                    placeholder="הקלד עיר לחפש"
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={locationQuery}
                    onChangeText={setLocationQuery}
                    textAlign="right"
                  />
                </View>
                <View style={styles.suggestionsList}>
                  {locationSuggestions.map((suggestion, i) => (
                    <TouchableOpacity key={i} style={styles.suggestionItem} activeOpacity={0.7}>
                      <Text style={styles.suggestionText}>{suggestion}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Rating Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('rating')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'rating' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>דירוג</Text>
            </TouchableOpacity>
            {expandedSection === 'rating' && (
              <View style={styles.accordionContent}>
                <View style={styles.badgePills}>
                  {ratingPills.map((pill, i) => (
                    <TouchableOpacity key={i} style={styles.pill} activeOpacity={0.7}>
                      <Text style={styles.pillText}>{pill}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Dives Number Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('dives')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'dives' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>מס׳ ביצע צלילה</Text>
            </TouchableOpacity>
            {expandedSection === 'dives' && (
              <View style={styles.accordionContent}>
                <View style={styles.badgePills}>
                  {divesPills.map((pill, i) => (
                    <TouchableOpacity key={i} style={styles.pillNumber} activeOpacity={0.7}>
                      <Text style={styles.pillNumberText}>{pill}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
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
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  tabBtn: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  applySection: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  accordion: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  filterLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
    flex: 1,
    textAlign: 'right',
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.offWhite[100],
  },
  accordionHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  accordionTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
    flex: 1,
    textAlign: 'right',
  },
  accordionContent: {
    paddingBottom: spacing.lg,
    flexDirection: 'column',
    gap: spacing.md,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  searchInputText: {
    flex: 1,
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  suggestionsList: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  suggestionItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white[100],
  },
  suggestionText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  badgePills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.offWhite[100],
    borderWidth: 1,
    borderColor: colors.offWhite[100],
  },
  pillText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  pillNumber: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.offWhite[100],
    borderWidth: 1,
    borderColor: colors.offWhite[100],
  },
  pillNumberText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
});
