import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, borderRadius } from '@/constants/design-system';

interface ToggleProps {
  active: boolean;
  onPress: () => void;
  badge?: number | string;
}

export default function Toggle({ active, onPress, badge }: ToggleProps) {
  return (
    <TouchableOpacity
      style={[styles.toggle, active && styles.toggleActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.toggleCircle, active && styles.toggleCircleActive]}>
        {badge !== undefined && (
          <Text style={styles.badge}>{badge}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.offWhite[100],
    position: 'relative',
    padding: 0,
  },
  toggleActive: {
    backgroundColor: colors.lightBlue[100],
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white[100],
    position: 'absolute',
    top: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleCircleActive: {
    transform: [{ translateX: -20 }], // Move to left when active
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
});
