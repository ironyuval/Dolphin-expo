import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import BottomSheet from '@/components/shared/BottomSheet';
import Button from '@/components/shared/Button';
import Toggle from '@/components/shared/Toggle';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import SearchIcon from '@/assets/icons/ui/search.svg';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';

interface DivingClubsFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (count: number) => void;
}

export default function DivingClubsFilter({ isOpen, onClose, onApply }: DivingClubsFilterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['ישראל']);
  const [searchQueries, setSearchQueries] = useState({ club: '', city: '' });
  const [maxDistance, setMaxDistance] = useState('50');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleCountry = (countryName: string) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== countryName));
    } else {
      setSelectedCountries([...selectedCountries, countryName]);
    }
  };

  const handleClearAll = () => {
    setSelectedCountries([]);
    setSearchQueries({ club: '', city: '' });
    setMaxDistance('50');
  };

  const handleApply = () => {
    const count = selectedCountries.length;
    onApply(count);
  };

  const countries = [
    { name: 'ישראל', flag: '🇮🇱' },
    { name: 'יוון', flag: '🇬🇷' },
    { name: 'ספרד', flag: '🇪🇸' },
    { name: 'איטליה', flag: '🇮🇹' },
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
          {/* Country Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('country')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'country' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>מדינה</Text>
            </TouchableOpacity>
            {expandedSection === 'country' && (
              <View style={styles.accordionContent}>
                <View style={styles.countriesGrid}>
                  {countries.map((country) => (
                    <View key={country.name} style={styles.countryRow}>
                      <Toggle
                        active={selectedCountries.includes(country.name)}
                        onPress={() => toggleCountry(country.name)}
                      />
                      <View style={styles.countryInfo}>
                        <Text style={styles.countryName}>{country.name}</Text>
                        <Text style={styles.countryFlag}>{country.flag}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* City Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('city')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'city' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>עיר</Text>
            </TouchableOpacity>
            {expandedSection === 'city' && (
              <View style={styles.accordionContent}>
                <View style={styles.searchInput}>
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                  <TextInput
                    style={styles.searchInputText}
                    placeholder="חיפוש עיר..."
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={searchQueries.city}
                    onChangeText={(text) => setSearchQueries({ ...searchQueries, city: text })}
                    textAlign="right"
                  />
                </View>
              </View>
            )}
          </View>

          {/* Club Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('club')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'club' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>מועדון</Text>
            </TouchableOpacity>
            {expandedSection === 'club' && (
              <View style={styles.accordionContent}>
                <View style={styles.searchInput}>
                  <SearchIcon width={16} height={16} fill={colors.primaryDarkest} />
                  <TextInput
                    style={styles.searchInputText}
                    placeholder="חיפוש מועדון..."
                    placeholderTextColor="rgba(1, 0, 37, 0.6)"
                    value={searchQueries.club}
                    onChangeText={(text) => setSearchQueries({ ...searchQueries, club: text })}
                    textAlign="right"
                  />
                </View>
              </View>
            )}
          </View>

          {/* Distance Section */}
          <View style={styles.accordionItem}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection('distance')}
              activeOpacity={0.7}
            >
              <ChevronDownIcon
                width={16}
                height={8}
                fill={colors.primaryDarkest}
                style={[
                  styles.chevron,
                  expandedSection === 'distance' && styles.chevronExpanded,
                ]}
              />
              <Text style={styles.accordionTitle}>מרחק</Text>
            </TouchableOpacity>
            {expandedSection === 'distance' && (
              <View style={styles.accordionContent}>
                <View style={styles.distanceInput}>
                  <Text style={styles.distanceLabel}>מרחק מקסימלי: {maxDistance} ק״מ</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={100}
                    value={parseFloat(maxDistance)}
                    onValueChange={(value) => setMaxDistance(Math.round(value).toString())}
                    minimumTrackTintColor={colors.lightBlue[100]}
                    maximumTrackTintColor={colors.offWhite[100]}
                    thumbTintColor={colors.lightBlue[100]}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button variant="primary" fullWidth onPress={handleApply}>
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
  clearAll: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: 'rgba(1, 0, 37, 0.5)',
  },
  closeBtn: {
    fontSize: 20,
    color: 'rgba(1, 0, 37, 0.5)',
    width: 24,
    height: 24,
    textAlign: 'center',
  },
  accordion: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
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
  },
  countriesGrid: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  countryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  countryName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  countryFlag: {
    fontSize: 20,
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
  distanceInput: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  distanceLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '500',
    color: colors.primaryDarkest,
    marginBottom: spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  footer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.offWhite[100],
  },
});
