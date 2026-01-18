import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@/constants/design-system';
import FilterItem from './FilterItem';

interface SelectionGroupProps {
  items?: Array<{ label: string; icon: string }>;
}

export default function SelectionGroup({ 
  items = [
    { label: 'עומק', icon: '⬇️' },
    { label: 'נייטרוקס', icon: '💨' },
    { label: 'הצלה', icon: '🆘' },
    { label: 'לילה', icon: '🌙' },
  ]
}: SelectionGroupProps) {
  return (
    <View style={styles.group}>
      {items.map((item, index) => (
        <FilterItem key={index} label={item.label} icon={item.icon} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
