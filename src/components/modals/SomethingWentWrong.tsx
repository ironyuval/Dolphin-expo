import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { colors, typography, spacing } from '@/constants/design-system';
import ErrorIcon from '@/assets/icons/error.svg';

interface SomethingWentWrongProps {
  visible: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export default function SomethingWentWrong({ visible, onClose, onRetry }: SomethingWentWrongProps) {
  return (
    <Modal visible={visible} onClose={onClose} variant="error">
      <View style={styles.iconContainer}>
        <ErrorIcon width={64} height={64} fill={colors.error} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>משהו השתבש...</Text>
        <Text style={styles.message}>
          אופס! נראה שמשהו לא עבד כמצופה.{'\n'}
          אנא נסו שוב מאוחר יותר.
        </Text>
      </View>

      <View style={styles.actions}>
        {onRetry && (
          <Button variant="primary" fullWidth size="lg" onPress={onRetry}>
            נסה שוב
          </Button>
        )}
        <Button variant="ghost" fullWidth size="md" onPress={onClose}>
          ביטול
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes['2xl'],
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.neutral.medium,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
