import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/design-system';

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

export default function LanguageToggle() {
  const [selected, setSelected] = useState<string>('HEB');
  
  const languages: LanguageOption[] = [
    { code: 'HEB', label: 'עברית (HEB)', flag: '🇮🇱' },
    { code: 'EN', label: 'English (EN)', flag: '🇺🇸' },
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[styles.option, selected === lang.code && styles.optionActive]}
          onPress={() => setSelected(lang.code)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>{lang.label}</Text>
          <Text style={styles.flag}>{lang.flag}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: colors.neutral.lighter,
  },
  optionActive: {
    backgroundColor: colors.lightBlue[15],
    borderColor: colors.lightBlue[100],
  },
  optionText: {
    fontSize: 14,
    color: colors.primaryDarkest,
  },
  flag: {
    fontSize: 20,
  },
});
