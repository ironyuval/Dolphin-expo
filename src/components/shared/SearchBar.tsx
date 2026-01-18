import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/design-system';
import SearchIcon from '@/assets/icons/search.svg';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  onChangeText?: (text: string) => void;
  className?: string;
}

export default function SearchBar({ 
  placeholder = 'חפש...', 
  value, 
  onChange,
  onChangeText,
  className = '' 
}: SearchBarProps) {
  const handleChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={[styles.container, className]}>
      <SearchIcon width={20} height={20} fill={colors.neutral.medium} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral.medium}
        value={value}
        onChangeText={handleChange}
        textAlign="right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.neutral.lighter,
    paddingHorizontal: spacing.lg,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
});
