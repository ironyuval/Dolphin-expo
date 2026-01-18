import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { InputProps } from '@/types';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';

export default function Input({
  label,
  error,
  icon,
  type = 'text',
  placeholder,
  value,
  onChangeText,
  className = '',
  onIconPress,
  iconPosition = 'start',
  textAlign = 'right',
  placeholderAlign,
  labelColor,
  customPrefix,
  secureTextEntry,
  ...props
}: InputProps) {
  const isIconString = typeof icon === 'string' || (icon && 'uri' in icon);
  const finalPlaceholderAlign = placeholderAlign || 'right';
  const isPassword = type === 'password' || secureTextEntry;
  
  const getIconSource = (): ImageSourcePropType | null => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      // Treat string as URI - Metro bundler requires static require() paths
      return { uri: icon };
    }
    if ('uri' in icon || 'default' in icon) {
      return icon as ImageSourcePropType;
    }
    return null;
  };

  const inputStyle: TextStyle[] = [
    styles.input,
    textAlign === 'left' ? styles.alignLeft : styles.alignRight,
  ];

  const wrapperStyle: ViewStyle[] = [
    styles.inputWrapper,
    error && styles.errorBorder,
    iconPosition === 'end' ? styles.rowReverse : styles.row,
    textAlign === 'left' ? styles.dirLtr : styles.dirRtl,
  ].filter(Boolean) as ViewStyle[];

  return (
    <View style={[styles.container, className as ViewStyle]}>
      {label && (
        <Text style={[styles.label, labelColor && { color: labelColor }]}>
          {label}
        </Text>
      )}
      <View style={wrapperStyle}>
        {customPrefix && (
          <View style={styles.customPrefix}>{customPrefix}</View>
        )}

        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          placeholderTextColor="rgba(1, 0, 37, 0.5)"
          textAlign={finalPlaceholderAlign}
          {...(props.autoComplete ? { autoComplete: props.autoComplete as any } : {})}
          {...props}
        />

        {icon &&
          (onIconPress ? (
            <TouchableOpacity
              onPress={onIconPress}
              style={styles.iconButton}
            >
              {isIconString ? (
                <Image source={getIconSource()!} style={styles.iconImage} />
              ) : (
                React.createElement(icon as React.ComponentType<any>, { width: 24, height: 24, fill: colors.primaryDarkest })
              )}
            </TouchableOpacity>
          ) : (
            <View style={styles.icon}>
              {isIconString ? (
                <Image source={getIconSource()!} style={styles.iconImage} />
              ) : (
                React.createElement(icon as React.ComponentType<any>, { width: 24, height: 24, fill: colors.primaryDarkest })
              )}
            </View>
          ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  },
  label: {
    fontSize: typography.sizes.sm,
    color: '#000000',
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.3)',
    paddingHorizontal: spacing.lg,
    height: 48,
    overflow: 'hidden',
  },
  dirLtr: {
    flexDirection: 'row',
  },
  dirRtl: {
    flexDirection: 'row-reverse',
  },
  errorBorder: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    fontSize: 14,
    color: colors.primaryDarkest,
    height: '100%',
    fontFamily: typography.fontFamilies.main,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
  icon: {
    width: 24,
    height: 24,
    color: colors.primaryDarkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  iconButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  customPrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    flexShrink: 0,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    color: colors.error,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
});
