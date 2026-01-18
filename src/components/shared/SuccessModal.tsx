import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from './Modal';
import Button from './Button';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import Svg, { Circle, Path } from 'react-native-svg';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  description,
  buttonText = 'בואו נצלול!',
  onButtonClick,
}: SuccessModalProps) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      onClose();
    }
  };

  return (
    <Modal visible={isOpen} onClose={onClose} variant="success">
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <Circle cx="19" cy="19" r="19" fill={colors.lightBlue[15]} />
            <Circle cx="19" cy="19" r="15" fill={colors.lightBlue[100]} />
            <Path
              d="M13 19L17 23L25 15"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Button variant="primary" fullWidth onPress={handleButtonClick} style={styles.actionBtn}>
        {buttonText}
      </Button>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  iconWrapper: {
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes['2xl'],
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
  },
  actionBtn: {
    marginTop: spacing.lg,
  },
});
