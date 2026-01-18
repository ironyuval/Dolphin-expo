import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import Toggle from '@/components/shared/Toggle';
import Calendar from '@/components/shared/Calendar';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SearchIcon from '@/assets/icons/ui/search.svg';

interface DivingHistoryFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DivingHistoryFilter({ isOpen, onClose }: DivingHistoryFilterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['ישראל', 'יוון']);
  const [searchQueries, setSearchQueries] = useState({ club: '', city: '', partner: '' });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleClearAll = () => {
    setSelectedCountries([]);
    setSearchQueries({ club: '', city: '', partner: '' });
  };

  const countries = [
    { name: 'ישראל', count: 8, flag: 'il' },
    { name: 'יוון', count: 21, flag: 'gr' },
    { name: 'ספרד', count: 2, flag: 'es' },
    { name: 'לורם איפסום', count: 5, flag: null },
  ];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={styles.clearAll}>נקה הכל</Text>
          </TouchableOpacity>
          <Text style={styles.title}>סינון</Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <Text style={styles.closeBtn}>✕</Text>
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
                <Text
                  style={[
                    styles.chevron,
                    expandedSection === 'date' && styles.chevronUp,
                  ]}
                >
                  ▼
                </Text>
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

          {/* Country Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('country')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                {selectedCountries.length > 0 && (
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeText}>{selectedCountries.length}</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.chevron,
                    expandedSection === 'country' && styles.chevronUp,
                  ]}
                >
                  ▼
                </Text>
              </View>
              <Text style={styles.sectionLabel}>מדינה</Text>
            </TouchableOpacity>
            {expandedSection === 'country' && (
              <View style={styles.expandedContent}>
                {countries.map((country) => (
                  <View key={country.name} style={styles.filterOption}>
                    <View style={styles.optionLeft}>
                      <Toggle
                        active={selectedCountries.includes(country.name)}
                        onPress={() => {
                          setSelectedCountries((prev) =>
                            prev.includes(country.name)
                              ? prev.filter((c) => c !== country.name)
                              : [...prev, country.name]
                          );
                        }}
                      />
                      <View style={styles.countBadge}>
                        <Text style={styles.countBadgeText}>{country.count}</Text>
                      </View>
                    </View>
                    <View style={styles.optionRight}>
                      <Text style={styles.optionName}>{country.name}</Text>
                      {country.flag && (
                        <View style={styles.flagWrapper}>
                          <Image
                            source={{ uri: `https://flagcdn.com/w20/${country.flag}.png` }}
                            style={styles.flag}
                          />
                        </View>
                      )}
                      {!country.flag && <View style={styles.flagPlaceholder} />}
                    </View>
                  </View>
                ))}
              </View>
            )}
            <View style={styles.divider} />
          </View>

          {/* Club Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('club')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                <Text
                  style={[
                    styles.chevron,
                    expandedSection === 'club' && styles.chevronUp,
                  ]}
                >
                  ▼
                </Text>
              </View>
              <Text style={styles.sectionLabel}>מועדון צלילה</Text>
            </TouchableOpacity>
            {expandedSection === 'club' && (
              <View style={styles.expandedContent}>
                <View style={styles.searchBox}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="חיפוש לפי שם המועדון"
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={searchQueries.club}
                    onChangeText={(text) => setSearchQueries({ ...searchQueries, club: text })}
                    textAlign="right"
                  />
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                </View>
                <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                  {['לורם איפסום', 'לורם איפסום', 'לורם איפסום'].map((item, i) => (
                    <View key={i}>
                      <Text style={styles.listItem}>{item}</Text>
                      {i < 2 && <View style={styles.itemDivider} />}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            <View style={styles.divider} />
          </View>

          {/* City Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('city')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                <Text
                  style={[
                    styles.chevron,
                    expandedSection === 'city' && styles.chevronUp,
                  ]}
                >
                  ▼
                </Text>
              </View>
              <Text style={styles.sectionLabel}>
                מיקום <Text style={styles.subLabel}>(עיר)</Text>
              </Text>
            </TouchableOpacity>
            {expandedSection === 'city' && (
              <View style={styles.expandedContent}>
                <View style={styles.searchBox}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="חיפוש לפי שם העיר"
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={searchQueries.city}
                    onChangeText={(text) => setSearchQueries({ ...searchQueries, city: text })}
                    textAlign="right"
                  />
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                </View>
              </View>
            )}
            <View style={styles.divider} />
          </View>

          {/* Partner Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('partner')}
              activeOpacity={0.7}
            >
              <View style={styles.headerLeft}>
                <Text
                  style={[
                    styles.chevron,
                    expandedSection === 'partner' && styles.chevronUp,
                  ]}
                >
                  ▼
                </Text>
              </View>
              <Text style={styles.sectionLabel}>באדי</Text>
            </TouchableOpacity>
            {expandedSection === 'partner' && (
              <View style={styles.expandedContent}>
                <View style={styles.searchBox}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="חיפוש לפי שם"
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={searchQueries.partner}
                    onChangeText={(text) => setSearchQueries({ ...searchQueries, partner: text })}
                    textAlign="right"
                  />
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="primary" fullWidth onPress={onClose}>
            החל סינון
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
    color: 'rgba(1, 0, 37, 0.5)',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '700',
    fontSize: typography.sizes.lg,
    color: colors.primaryDarkest,
  },
  closeBtn: {
    fontSize: 20,
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
  activeBadge: {
    backgroundColor: colors.primaryDarkest,
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadgeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    color: colors.white[100],
    letterSpacing: 0.5,
  },
  sectionLabel: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '400',
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  subLabel: {
    fontSize: typography.sizes.xs,
  },
  chevron: {
    fontSize: 10,
    color: colors.primaryDarkest,
  },
  chevronUp: {
    transform: [{ rotate: '180deg' }],
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
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  countBadge: {
    backgroundColor: colors.primaryDarkest,
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    color: colors.white[100],
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  optionName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  flagWrapper: {
    width: 20,
    height: 20,
  },
  flag: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  flagPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.sm,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.offWhite[100],
  },
  searchInput: {
    flex: 1,
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  scrollList: {
    maxHeight: 200,
  },
  listItem: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    paddingVertical: spacing.sm,
  },
  itemDivider: {
    height: 1,
    backgroundColor: 'rgba(1, 0, 37, 0.1)',
    marginVertical: spacing.xs,
  },
  footer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.offWhite[100],
    marginHorizontal: -spacing.xl,
  },
});
