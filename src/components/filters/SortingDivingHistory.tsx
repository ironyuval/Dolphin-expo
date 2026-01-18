import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import Calendar from '@/components/shared/Calendar';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SortIcon from '@/assets/icons/ui/sort.svg';

interface SortingDivingHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SortingDivingHistory({ isOpen, onClose }: SortingDivingHistoryProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [sortOrders, setSortOrders] = useState({ date: 'asc', number: 'desc' });
  const [divingNumber, setDivingNumber] = useState('');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleSortOrder = (section: 'date' | 'number') => {
    setSortOrders((prev) => ({
      ...prev,
      [section]: prev[section] === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleClearAll = () => {
    setDivingNumber('');
    setSortOrders({ date: 'asc', number: 'desc' });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.clearAll}>נקה הכל</Text>
          </TouchableOpacity>
          <Text style={styles.title}>מיון לפי</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.cancelBtn}>ביטול</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.accordion} showsVerticalScrollIndicator={false}>
          {/* Date Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('date')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleSortOrder('date');
                  }}
                  activeOpacity={0.7}
                >
                  <Animated.View
                    style={[
                      styles.sortIconWrapper,
                      sortOrders.date === 'desc' && styles.rotate,
                    ]}
                  >
                    <SortIcon width={16} height={16} fill={colors.primaryDarkest} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionLabel}>תאריך</Text>
            </TouchableOpacity>
            {expandedSection === 'date' && (
              <View style={styles.expandedContent}>
                <Calendar selectedDay={25} highlightedDay={15} />
              </View>
            )}
            <View style={styles.divider} />
          </View>

          {/* Diving Number Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('number')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleSortOrder('number');
                  }}
                  activeOpacity={0.7}
                >
                  <Animated.View
                    style={[
                      styles.sortIconWrapper,
                      sortOrders.number === 'desc' && styles.rotate,
                    ]}
                  >
                    <SortIcon width={16} height={16} fill={colors.primaryDarkest} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionLabel}>מספר צלילה</Text>
            </TouchableOpacity>
            {expandedSection === 'number' && (
              <View style={styles.expandedContent}>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.numberInput}
                    placeholder="הזן מספר צלילה"
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={divingNumber}
                    onChangeText={setDivingNumber}
                    keyboardType="numeric"
                    textAlign="right"
                  />
                </View>
              </View>
            )}
            <View style={styles.divider} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="primary" fullWidth onPress={onClose}>
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
    maxHeight: '85%',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  clearAll: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '700',
    fontSize: typography.sizes.lg,
    color: colors.primaryDarkest,
  },
  cancelBtn: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  accordion: {
    flexDirection: 'column',
  },
  accordionItem: {
    flexDirection: 'column',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sortIconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate: {
    transform: [{ rotate: '180deg' }],
  },
  sectionLabel: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '400',
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(1, 0, 37, 0.1)',
    width: '100%',
  },
  expandedContent: {
    paddingBottom: spacing.md,
    flexDirection: 'column',
    gap: spacing.md,
  },
  inputWrapper: {
    width: '100%',
  },
  numberInput: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.offWhite[100],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    backgroundColor: colors.white[100],
  },
  footer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.offWhite[100],
    marginHorizontal: -spacing.xl,
  },
});
