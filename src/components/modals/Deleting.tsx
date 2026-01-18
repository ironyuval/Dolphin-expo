import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import XIcon from '@/assets/icons/ui/icon-close.svg';
import TrashIcon from '@/assets/icons/ui/icon-trash.svg';

interface DeletingProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export default function Deleting({
  visible,
  onClose,
  onConfirm,
  itemName = 'לורם איפסום דולור',
}: DeletingProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <View style={styles.iconWrapper}>
            <TrashIcon width={48} height={48} fill={colors.error} />
          </View>
          <Text style={styles.title}>מחיקת "{itemName}"</Text>
          <Text style={styles.description}>
            את.ה בטוח.ה שברצונך למחוק את קובץ{' '}
            <Text style={styles.boldText}>{itemName}</Text>? פריט שנמחק אינו ניתן לשחזור.
          </Text>
        </View>

        <View style={styles.actions}>
          <Button variant="ghost" onPress={onClose}>
            חזור
          </Button>
          <Button variant="primary" onPress={onConfirm}>
            כן, מחק
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  iconWrapper: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.neutral.medium,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.lg,
  },
  boldText: {
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    justifyContent: 'center',
  },
});
