import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from '../shared/Modal';
import { colors, typography, spacing } from '@/constants/design-system';
import SuccessCheckIcon from '@/assets/icons/success-check.svg';

interface SuccessfullActionProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function SuccessfullAction({
  visible,
  onClose,
  title = 'בוצע בהצלחה!',
  message = 'הפעולה הושלמה בהצלחה',
}: SuccessfullActionProps) {
  return (
    <Modal visible={visible} onClose={onClose} variant="success">
      <View style={styles.iconContainer}>
        <SuccessCheckIcon width={38} height={38} fill={colors.lightBlue[100]} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </Modal>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginBottom: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '800',
    fontSize: typography.sizes.base,
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 0.08,
  },
  message: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: 0.12,
  },
});
