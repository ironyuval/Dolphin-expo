import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { ModalProps } from '@/types';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import Svg, { Path } from 'react-native-svg';

interface ExtendedModalProps extends ModalProps {
  isOpen?: boolean;
  variant?: 'default' | 'error' | 'success' | 'fullscreen';
  showCloseButton?: boolean;
}

export default function Modal({ 
  isOpen = false,
  visible,
  onClose, 
  title, 
  children, 
  variant = 'default',
  className = '',
  showCloseButton = true 
}: ExtendedModalProps) {
  const modalVisible = isOpen || visible;
  if (!modalVisible) return null;

  return (
    <RNModal
      visible={modalVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView intensity={4} style={StyleSheet.absoluteFill} />
        <TouchableOpacity 
          style={[
            styles.modal,
            variant === 'error' && styles.error,
            variant === 'success' && styles.success,
            variant === 'fullscreen' && styles.fullscreen,
            className
          ]}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <Path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </Svg>
            </TouchableOpacity>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>
            {children}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modal: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.xl,
    width: '100%',
    maxWidth: 375,
    maxHeight: '90%',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.xl,
  },
  error: {
    borderTopWidth: 4,
    borderTopColor: colors.error,
  },
  success: {
    borderTopWidth: 4,
    borderTopColor: colors.success,
  },
  fullscreen: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 0,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.offWhite[100],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primaryDarkest,
    textAlign: 'center',
    paddingTop: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
});
