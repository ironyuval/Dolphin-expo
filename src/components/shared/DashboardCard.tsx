import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'secondary';
}

export default function DashboardCard({
  title,
  subtitle,
  icon,
  badge,
  onPress,
  variant = 'default',
}: DashboardCardProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[styles.card, styles[variant]]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {icon && <View style={styles.indicator}>{icon}</View>}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {badge && <View style={styles.badge}>{badge}</View>}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
    gap: spacing.md,
  },
  default: {},
  primary: {
    backgroundColor: colors.lightBlue[15],
  },
  secondary: {
    backgroundColor: colors.offWhite[100],
  },
  indicator: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.xs,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.primaryDarkest,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.neutral.medium,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
