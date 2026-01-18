import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';

interface MiniCTAProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export default function MiniCTA({ children, onPress, className = '' }: MiniCTAProps) {
  return (
    <TouchableOpacity
      style={[styles.miniCta, className]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {typeof children === 'string' ? (
        <Text style={styles.text}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  miniCta: {
    padding: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textDecorationLine: 'underline',
  },
});
