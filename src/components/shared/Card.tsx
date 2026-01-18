import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CardProps } from '@/types';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';

interface ExtendedCardProps extends CardProps {
  title?: string;
  subtitle?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
  onPress?: () => void;
}

export default function Card({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  padding = 'lg',
  onPress 
}: ExtendedCardProps) {
  const Container = onPress ? TouchableOpacity : View;
  
  return (
    <Container 
      style={[
        styles.card,
        styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof styles],
        className
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
    overflow: 'hidden',
    width: '100%',
  },
  paddingSm: {
    padding: spacing.sm,
  },
  paddingMd: {
    padding: spacing.md,
  },
  paddingLg: {
    padding: spacing.lg,
  },
  paddingNone: {
    padding: 0,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.primaryDarkest,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.neutral.medium,
    marginTop: 2,
  },
  content: {
    flexDirection: 'column',
  },
});
