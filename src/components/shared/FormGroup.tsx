import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing } from '@/constants/design-system';

interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormGroup({ label, children, className }: FormGroupProps) {
  return (
    <View style={[styles.group, className]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  },
  label: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
  },
  content: {
    width: '100%',
  },
});
