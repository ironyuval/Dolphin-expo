import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { typography, spacing } from '@/constants/design-system';

interface SectionContainerProps {
  title?: string;
  children: React.ReactNode;
  onViewMore?: () => void;
  viewMoreLabel?: string;
  className?: string;
}

export default function SectionContainer({ 
  title, 
  children, 
  onViewMore, 
  viewMoreLabel = "הצג הכל", 
  className 
}: SectionContainerProps) {
  return (
    <View style={[styles.container, className]}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
      {onViewMore && (
        <TouchableOpacity onPress={onViewMore} style={styles.viewMore}>
          <Text style={styles.viewMoreText}>{viewMoreLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    textAlign: 'right',
  },
  content: {
    width: '100%',
  },
  viewMore: {
    marginTop: spacing.md,
    alignSelf: 'flex-end',
  },
  viewMoreText: {
    fontSize: typography.sizes.sm,
    color: '#006FFD',
    textAlign: 'right',
  },
});
