import React, { useRef, useEffect } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView intensity={10} style={StyleSheet.absoluteFill} />
        <TouchableOpacity 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
                paddingBottom: insets.bottom,
              }
            ]}
          >
            {children}
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FAFAFA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingTop: 16,
  },
});
