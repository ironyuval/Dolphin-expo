import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '@/constants/design-system';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import EmergencyIcon from '@/assets/icons/emergency.svg';

interface NavbarProps {
  title?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function Navbar({ title, onBack, rightElement }: NavbarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.navbar, { paddingTop: insets.top }]}>
      <View style={styles.left}>
        {onBack !== undefined && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeftIcon width={24} height={24} fill={colors.primaryDarkest} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.center}>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
      
      <View style={styles.right}>
        {rightElement || (
          <View style={styles.emergencyIconWrapper}>
            <EmergencyIcon width={24} height={24} fill={colors.primaryDarkest} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.white[100],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lighter,
  },
  left: {
    width: 40,
    alignItems: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  right: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: spacing.xs,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  emergencyIconWrapper: {
    padding: spacing.xs,
  },
});
