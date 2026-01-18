import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from '@/components/shared/Modal';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import XIcon from '@/assets/icons/ui/icon-close-small.svg';

interface DocumentCategoryProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (category: string) => void;
}

const categories = [
  'ביטוח צלילה',
  'תעודת התמחות',
  'רישיון צלילה',
  'אחר',
];

export default function DocumentCategory({ visible, onClose, onSelect }: DocumentCategoryProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
          <XIcon width={7.38} height={7.38} fill={colors.primaryDarkest} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>איזה סוג מסמך העלת?</Text>

          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.actionBtn}
              onPress={() => {
                onSelect(category);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.actionBtnText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white[100],
    position: 'relative',
    width: 246,
    height: 259,
    borderRadius: 13.12,
    overflow: 'hidden',
    ...shadows.sm,
  },
  closeBtn: {
    position: 'absolute',
    left: 18.04,
    top: 17.22,
    width: 7.38,
    height: 7.38,
    zIndex: 10,
  },
  content: {
    position: 'absolute',
    left: 13.12,
    top: 24.6,
    width: 219.76,
    flexDirection: 'column',
    gap: 16.4,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '400',
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  actionBtn: {
    backgroundColor: colors.lightBlue[100],
    width: '100%',
    height: 32.8,
    borderRadius: 9.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnText: {
    color: colors.white[100],
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
  },
});
