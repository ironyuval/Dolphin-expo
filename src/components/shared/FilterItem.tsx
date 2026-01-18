import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/design-system';

interface FilterItemProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function FilterItem({ label, icon, selected = false, onPress }: FilterItemProps) {
  return (
    <TouchableOpacity
      style={[styles.item, selected && styles.itemSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: colors.neutral.lighter,
  },
  itemSelected: {
    backgroundColor: colors.lightBlue[15],
    borderColor: colors.lightBlue[100],
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    color: colors.primaryDarkest,
  },
  labelSelected: {
    color: colors.lightBlue[100],
    fontWeight: '600',
  },
});
