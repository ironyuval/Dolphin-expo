import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '@/constants/design-system';

interface GradientSurfaceProps {
  children: React.ReactNode;
  variant?: 'primary' | 'welcome';
  className?: string;
}

export default function GradientSurface({ children, variant = 'primary', className = '' }: GradientSurfaceProps) {
  const gradientColors = variant === 'welcome' ? gradients.welcome : gradients.primary;
  
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.surface, className]}
    >
      <View style={styles.content}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  surface: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
});
