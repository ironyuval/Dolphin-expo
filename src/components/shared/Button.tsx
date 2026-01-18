import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ButtonProps } from '@/types';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon: Icon,
  disabled = false,
  className = '',
  onPress,
  justify = 'center',
  ...props 
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyle: ViewStyle[] = [styles.button];
    
    // Variant styles
    if (variant === 'primary') baseStyle.push(styles.primary);
    if (variant === 'white') baseStyle.push(styles.white);
    if (variant === 'secondary') baseStyle.push(styles.secondary);
    if (variant === 'secondaryBlue') baseStyle.push(styles.secondaryBlue);
    if (variant === 'ghost') baseStyle.push(styles.ghost);
    if (variant === 'ghostWhite') baseStyle.push(styles.ghostWhite);
    if (variant === 'social') baseStyle.push(styles.social);
    if (variant === 'apple') baseStyle.push(styles.apple);
    
    // Size styles
    if (size === 'sm') baseStyle.push(styles.sm);
    if (size === 'md') baseStyle.push(styles.md);
    if (size === 'lg') baseStyle.push(styles.lg);
    
    // Other styles
    if (fullWidth) baseStyle.push(styles.fullWidth);
    if (justify === 'center') baseStyle.push(styles.justifyCenter);
    if (justify === 'space-between') baseStyle.push(styles.justifySpaceBetween);
    if (justify === 'start') baseStyle.push(styles.justifyStart);
    if (justify === 'end') baseStyle.push(styles.justifyEnd);
    if (disabled) baseStyle.push(styles.disabled);
    
    return baseStyle;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.text];
    
    // Variant text styles
    if (variant === 'primary') baseStyle.push(styles.primaryText);
    if (variant === 'white') baseStyle.push(styles.whiteText);
    if (variant === 'secondary') baseStyle.push(styles.secondaryText);
    if (variant === 'secondaryBlue') baseStyle.push(styles.secondaryBlueText);
    if (variant === 'ghost') baseStyle.push(styles.ghostText);
    if (variant === 'ghostWhite') baseStyle.push(styles.ghostWhiteText);
    
    // Size text styles
    if (size === 'sm') baseStyle.push(styles.smText);
    if (size === 'md') baseStyle.push(styles.mdText);
    if (size === 'lg') baseStyle.push(styles.lgText);
    
    if (disabled) baseStyle.push(styles.disabledText);
    
    return baseStyle;
  };

  return (
    <TouchableOpacity 
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {Icon && <Icon style={styles.icon} />}
      {typeof children === 'string' ? (
        <Text style={getTextStyle()}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    height: 48,
    flexShrink: 0,
  },
  text: {
    fontFamily: typography.fontFamilies.main,
  },
  // Variants
  primary: {
    backgroundColor: colors.lightBlue[100],
  },
  primaryText: {
    color: colors.white[100],
  },
  white: {
    backgroundColor: '#ffffff',
    ...shadows.md,
  },
  whiteText: {
    color: colors.primaryDarkest,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white[100],
  },
  secondaryText: {
    color: colors.white[100],
  },
  secondaryBlue: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.lightBlue[100],
  },
  secondaryBlueText: {
    color: colors.lightBlue[100],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: colors.primaryDarkest,
  },
  ghostWhite: {
    backgroundColor: 'transparent',
  },
  ghostWhiteText: {
    color: colors.white[100],
  },
  social: {
    borderRadius: borderRadius.full,
    width: 48,
    height: 48,
    padding: 0,
    backgroundColor: '#ffffff',
    ...shadows.sm,
  },
  apple: {
    borderRadius: borderRadius.full,
    width: 48,
    height: 48,
    padding: 0,
    backgroundColor: '#000000',
  },
  // Sizes
  sm: {
    height: 33,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },
  smText: {
    fontSize: typography.sizes.sm,
  },
  md: {
    paddingHorizontal: spacing.xl,
  },
  mdText: {
    fontSize: typography.sizes.md,
  },
  lg: {
    paddingHorizontal: spacing['2xl'],
  },
  lgText: {
    fontSize: typography.sizes.base,
  },
  fullWidth: {
    width: '100%',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  disabled: {
    backgroundColor: colors.offWhite[100],
  },
  disabledText: {
    color: 'rgba(1, 0, 37, 0.3)',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
