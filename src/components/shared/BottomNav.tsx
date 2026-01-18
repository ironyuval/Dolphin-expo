import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import HomeIcon from '@/assets/bottom_tabs/home.svg';
import ElementsIcon from '@/assets/bottom_tabs/elements2.svg';
import DivingIcon from '@/assets/bottom_tabs/diving.svg';
import CourseIcon from '@/assets/bottom_tabs/course.svg';

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  route: string;
}

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const tabs: Tab[] = [
    { id: 'Home', label: 'בית', icon: HomeIcon, route: '/(tabs)' },
    { id: 'Elements', label: 'אלמנטים', icon: ElementsIcon, route: '/elements' },
    { id: 'Diving', label: 'צלילה', icon: DivingIcon, route: '/diving' },
    { id: 'Course', label: 'קורס', icon: CourseIcon, route: '/courses' },
  ];

  const isActive = (tab: Tab) => {
    if (tab.route === '/(tabs)') {
      return pathname === '/(tabs)' || pathname === '/';
    }
    return pathname?.startsWith(tab.route);
  };

  return (
    <View style={[styles.navContainer, { paddingBottom: insets.bottom }]}>
      {tabs.map(tab => {
        const active = isActive(tab);
        const IconComponent = tab.icon;
        
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.navItem, active && styles.active]}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              <IconComponent 
                width={25} 
                height={25} 
                fill={active ? '#ffffff' : colors.offWhite[100]}
              />
            </View>
            <Text style={[styles.label, active && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryDarkest,
    height: 80,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: 10,
    ...shadows.md,
    zIndex: 1000,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    flex: 1,
    opacity: 0.5,
    minHeight: 0,
    minWidth: 0,
  },
  active: {
    opacity: 1,
  },
  iconWrapper: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    color: colors.offWhite[100],
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.medium,
    fontFamily: typography.fontFamilies.main,
  },
  activeLabel: {
    color: '#ffffff',
  },
});
