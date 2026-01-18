import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/constants/design-system';
import Svg, { Path } from 'react-native-svg';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Checkbox({ label, checked, onChange, className = '' }: CheckboxProps) {
  return (
    <TouchableOpacity
      style={[styles.container, className]}
      onPress={() => onChange(!checked)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkmark, checked && styles.checked]}>
        {checked && (
          <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <Path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.neutral.lighter,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checked: {
    backgroundColor: colors.lightBlue[100],
    borderColor: colors.lightBlue[100],
  },
  label: {
    fontSize: 14,
    color: colors.primaryDarkest,
  },
});
