import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import StatusBar from '@/components/shared/StatusBar';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import XIcon from '@/assets/icons/ui/icon-close.svg';
import UploadIcon from '@/assets/icons/ui/icon-close.svg';

export default function Scanner() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<'single' | 'multi'>('multi');
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    if (permission && !permission.granted && !permission.canAskAgain) {
      Alert.alert(
        'הרשאות מצלמה',
        'אנא אפשר גישה למצלמה בהגדרות האפליקציה',
        [{ text: 'אישור', onPress: () => router.back() }]
      );
    }
  }, [permission]);

  React.useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();
    return () => pulseAnimation.stop();
  }, []);

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0.5, 2],
    outputRange: [0.6, 0],
  });

  if (!permission) {
    return (
      <View style={[styles.screen, styles.centerContent]}>
        <Text style={styles.loadingText}>טוען...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.screen, styles.centerContent]}>
        <Text style={styles.permissionText}>נדרשת הרשאת מצלמה</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
          activeOpacity={0.7}
        >
          <Text style={styles.permissionButtonText}>אפשר גישה למצלמה</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar variant="light" />

      {/* Camera Viewport */}
      <CameraView
        style={styles.cameraViewport}
        facing="back"
        flash={isFlashOn ? 'on' : 'off'}
      >
        <View style={styles.cameraOverlay}>
          <View style={styles.scannerGuide}>
            <View style={styles.detectDoc}>
              <Animated.View
                style={[
                  styles.docPulse,
                  {
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseOpacity,
                  },
                ]}
              />
              <Text style={styles.docLabel}>מזהה מסמך...</Text>
            </View>
          </View>
        </View>
      </CameraView>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <XIcon width={28} height={28} fill="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>סריקת מסמכים</Text>
        <TouchableOpacity
          style={[styles.flashBtn, isFlashOn && styles.flashOn]}
          onPress={() => setIsFlashOn(!isFlashOn)}
          activeOpacity={0.7}
        >
          <Text style={styles.flashIcon}>⚡</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'single' && styles.activeTab]}
            onPress={() => setMode('single')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === 'single' && styles.activeTabText,
              ]}
            >
              דף יחיד
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'multi' && styles.activeTab]}
            onPress={() => setMode('multi')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.modeTabText,
                mode === 'multi' && styles.activeTabText,
              ]}
            >
              מספר דפים
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.shutterRow}>
          <TouchableOpacity style={styles.galleryBtn} activeOpacity={0.7}>
            <UploadIcon width={24} height={24} fill="#ffffff" />
          </TouchableOpacity>

          <View style={styles.shutterOuter}>
            <TouchableOpacity style={styles.shutterBtn} activeOpacity={0.8}>
              <View style={styles.shutterInner} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>מקם את המסמך בתוך המסגרת לסריקה אוטומטית</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000000',
  },
  cameraViewport: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cameraOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  scannerGuide: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1 / 1.4,
    maxWidth: 300,
    borderWidth: 2,
    borderColor: colors.error,
    borderRadius: borderRadius.md,
  },
  detectDoc: {
    position: 'absolute',
    top: '8%',
    left: '8%',
    right: '8%',
    bottom: '8%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
  },
  docPulse: {
    width: 40,
    height: 40,
    backgroundColor: colors.lightBlue[100],
    borderRadius: borderRadius.full,
  },
  docLabel: {
    marginTop: spacing.lg,
    color: colors.white[100],
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  topControls: {
    position: 'relative',
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  closeBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashOn: {
    backgroundColor: colors.lightBlue[100],
  },
  flashIcon: {
    fontSize: 24,
    color: colors.white[100],
  },
  headerTitle: {
    color: colors.white[100],
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 40,
    paddingHorizontal: spacing.xl,
    paddingBottom: 60,
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing['2xl'],
  },
  modeSelector: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    borderRadius: borderRadius.full,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modeTab: {
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: colors.white[100],
  },
  modeTabText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.white[100],
    opacity: 0.6,
  },
  activeTabText: {
    color: colors.primaryDarkest,
    opacity: 1,
  },
  shutterRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 320,
  },
  galleryBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
    color: colors.white[100],
  },
  shutterOuter: {
    width: 88,
    height: 88,
    borderWidth: 4,
    borderColor: colors.white[100],
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  shutterBtn: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.full,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlue[100],
    borderRadius: borderRadius.full,
  },
  hint: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: typography.fontFamilies.main,
    fontSize: 13,
    textAlign: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    color: colors.white[100],
  },
  permissionText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    color: colors.white[100],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  permissionButton: {
    backgroundColor: colors.lightBlue[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
  },
  permissionButtonText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.white[100],
  },
});
