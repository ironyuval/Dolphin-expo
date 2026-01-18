import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/constants/design-system';
import Svg, { Path } from 'react-native-svg';

interface StatusBarProps {
  time?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function StatusBar({ time = '9:41', variant = 'light', className = '' }: StatusBarProps) {
  const insets = useSafeAreaInsets();
  const textColor = variant === 'light' ? colors.white[100] : colors.primaryDarkest;

  return (
    <BlurView intensity={20} style={[styles.statusBar, { paddingTop: insets.top }, className]}>
      <Text style={[styles.time, { color: textColor }]}>{time}</Text>
      <View style={styles.icons}>
        <Text style={[styles.battery, { color: textColor }]}>🔋</Text>
        <View style={styles.signal}>
          <Svg width="17" height="11" viewBox="0 0 17 11" fill="none">
            <Path d="M1 7.5H3V9.5H1V7.5Z" fill={textColor} opacity="0.4"/>
            <Path d="M4 5H6V9.5H4V5Z" fill={textColor} opacity="0.4"/>
            <Path d="M7 2.5H9V9.5H7V2.5Z" fill={textColor} opacity="0.4"/>
            <Path d="M10 1H12V9.5H10V1Z" fill={textColor}/>
          </Svg>
        </View>
        <Text style={[styles.wifi, { color: textColor }]}>📶</Text>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: spacing.lg,
    position: 'relative',
    zIndex: 100,
  },
  time: {
    fontFamily: 'SF Pro Text',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.165,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 14,
  },
  battery: {
    fontSize: 14,
    lineHeight: 14,
  },
  wifi: {
    fontSize: 14,
    lineHeight: 14,
  },
  signal: {
    width: 17,
    height: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
