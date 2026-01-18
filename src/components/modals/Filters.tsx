import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '../shared/BottomSheet';
import Button from '../shared/Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';

interface FiltersProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { sort: string; filters: string[] }) => void;
}

export default function Filters({ visible, onClose, onApply }: FiltersProps) {
  const [selectedSort, setSelectedSort] = useState('date_desc');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const sortOptions = [
    { id: 'date_desc', label: 'תאריך (מהחדש לישן)' },
    { id: 'date_asc', label: 'תאריך (מהישן לחדש)' },
    { id: 'depth_desc', label: 'עומק (מהעמוק לרדוד)' },
    { id: 'time_desc', label: 'זמן צלילה (מהארוך לקצר)' },
  ];

  const filterOptions = [
    { id: 'deep', label: 'צלילות עומק (>30m)' },
    { id: 'night', label: 'צלילות לילה' },
    { id: 'boat', label: 'צלילה מסירה' },
    { id: 'nitrox', label: 'נייטרוקס' },
    { id: 'club', label: 'מועדוני צלילה' },
  ];

  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({ sort: selectedSort, filters: selectedFilters });
    onClose();
  };

  const handleReset = () => {
    setSelectedSort('date_desc');
    setSelectedFilters([]);
  };

  return (
    <BottomSheet isOpen={visible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
            <Text style={styles.clearAll}>נקה הכל</Text>
          </TouchableOpacity>
          <Text style={styles.title}>סינון ומיון</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>מיון לפי</Text>
              <View style={styles.optionsGrid}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionChip,
                      selectedSort === option.id && styles.selected,
                    ]}
                    onPress={() => setSelectedSort(option.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedSort === option.id && styles.selectedText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>סינון</Text>
              <View style={styles.optionsGrid}>
                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionChip,
                      selectedFilters.includes(option.id) && styles.selected,
                    ]}
                    onPress={() => toggleFilter(option.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedFilters.includes(option.id) && styles.selectedText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="ghost" onPress={handleReset} style={styles.resetButton}>
            נקה הכל
          </Button>
          <Button variant="primary" onPress={handleApply} style={styles.applyButton}>
            הצג תוצאות
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  clearAll: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.lightBlue[100],
    fontWeight: '600',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  closeButton: {
    fontSize: 24,
    color: colors.primaryDarkest,
    fontWeight: '300',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    gap: spacing.xl,
  },
  section: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.primaryDarkest,
    marginBottom: spacing.sm,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: colors.neutral.lighter,
  },
  selected: {
    backgroundColor: colors.lightBlue[15],
    borderColor: colors.lightBlue[100],
  },
  optionText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  selectedText: {
    color: colors.lightBlue[100],
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.lighter,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 1,
  },
});
