import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing } from '@/constants/design-system';

export default function CenterRegion() {
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.arrow}>^</Text>
        <Text style={styles.regionTitle}>אזור מרכז</Text>
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.itemBlock}>
          <Text style={styles.itemLabel}>חדרה – נמל</Text>
          <Text style={styles.itemValue}>04-6225577</Text>
        </View>
        <View style={styles.itemBlock}>
          <Text style={styles.itemLabel}>חיל הים אזור מרכז</Text>
          <Text style={styles.itemValue}>03-6064232</Text>
        </View>
        <View style={styles.itemBlock}>
          <Text style={styles.itemLabel}>הרצליה – מרינה</Text>
          <Text style={styles.itemValue}>09-9565595</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  arrow: {
    fontSize: typography.sizes.lg,
    marginLeft: spacing.sm,
  },
  regionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    textAlign: 'right',
  },
  contentWrapper: {
    width: '100%',
  },
  itemBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E9F1',
  },
  itemLabel: {
    fontSize: typography.sizes.md,
    textAlign: 'right',
    flex: 1,
  },
  itemValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    textAlign: 'left',
  },
});
