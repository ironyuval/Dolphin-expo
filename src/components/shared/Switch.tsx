import React from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { colors, borderRadius } from '@/constants/design-system';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const knobPosition = new Animated.Value(checked ? 20 : 2);

  React.useEffect(() => {
    Animated.spring(knobPosition, {
      toValue: checked ? 20 : 2,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [checked]);

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.switch, checked && styles.switchOn, disabled && styles.disabled]}
      onPress={handleToggle}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: knobPosition }],
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 44,
    height: 24,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.lighter,
    position: 'relative',
    justifyContent: 'center',
  },
  switchOn: {
    backgroundColor: colors.lightBlue[100],
  },
  disabled: {
    opacity: 0.5,
  },
  slider: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 2,
    ...colors.shadows.sm,
  },
});
