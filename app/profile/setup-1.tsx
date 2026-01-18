import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import Svg, { Path } from 'react-native-svg';

export default function ProfileSetup1() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [stars, setStars] = useState('3');
  const [certification, setCertification] = useState('Rescue Diver');
  const [specialties, setSpecialties] = useState<string[]>([
    'Scooters',
    'Photography',
    'Emergency',
    'Depth',
    'Navigation',
  ]);

  const certificationOptions = [
    { id: '1star', label: 'כוכב אחד', value: '1 Star' },
    { id: '2stars', label: 'שני כוכבים', value: '2 Stars' },
    { id: 'rescue', label: 'צולל הצלה - כוכב שלישי', value: 'Rescue Diver' },
    {
      id: 'assistant',
      label: 'מדריך עוזר - דרגה א'',
      value: 'Assistant Instructor',
    },
    {
      id: 'instructor',
      label: 'מדריך מוסמך - דרגה ב'',
      value: 'Certified Instructor',
    },
    { id: 'senior', label: 'צולל בכיר', value: 'Senior Diver' },
    { id: 'master', label: 'מאסטרדייבר', value: 'Master Diver' },
  ];

  const specialtyOptions = [
    { id: 'scooters', label: 'התמחות סקוטרים', value: 'Scooters' },
    { id: 'photography', label: 'התמחות צילום', value: 'Photography' },
    { id: 'emergency', label: 'התמחות ע"ר והצלה', value: 'Emergency' },
    { id: 'balance', label: 'התמחות איזון', value: 'Balance' },
    { id: 'depth', label: 'התמחות עומק', value: 'Depth' },
    { id: 'navigation', label: 'התמחות ניווט', value: 'Navigation' },
    { id: 'nitrox', label: 'התמחות נייטרוקס', value: 'Nitrox' },
    { id: 'night', label: 'התמחות לילה', value: 'Night' },
    { id: 'marine', label: 'התמחות סובב ימי', value: 'Marine' },
  ];

  const toggleSpecialty = (value: string) => {
    if (specialties.includes(value)) {
      setSpecialties(specialties.filter((s) => s !== value));
    } else {
      setSpecialties([...specialties, value]);
    }
  };

  return (
    <View style={[styles.screen, { paddingBottom: 40 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Progress Bar (1/2) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.progressBarActive]} />
        <View style={styles.progressBar} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>הגדרת פרופיל</Text>
          <Text style={styles.subtitle}>מילוי כמה פרטים רגע לפני שצוללים</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>מס' הכוכבים שלך*</Text>
            <Input
              value={stars}
              onChangeText={setStars}
              placeholder="מס' כוכבים"
              keyboardType="numeric"
              textAlign="right"
            />
          </View>

          <View style={styles.selectionGroup}>
            <Text style={styles.fieldLabel}>ההסמכות שלך</Text>
            <View style={styles.optionsList}>
              {certificationOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={styles.optionItem}
                  onPress={() => setCertification(opt.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                  <View
                    style={[
                      styles.radio,
                      certification === opt.value && styles.radioActive,
                    ]}
                  >
                    {certification === opt.value && <View style={styles.radioInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.selectionGroup}>
            <Text style={styles.fieldLabel}>ההתמחויות שלך</Text>
            <View style={styles.optionsList}>
              {specialtyOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={styles.optionItem}
                  onPress={() => toggleSpecialty(opt.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionLabel}>{opt.label}</Text>
                  <View
                    style={[
                      styles.checkbox,
                      specialties.includes(opt.value) && styles.checkboxActive,
                    ]}
                  >
                    {specialties.includes(opt.value) && (
                      <Svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <Path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Svg>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            variant="primary"
            fullWidth
            onPress={() => router.push('/profile/setup-2')}
            style={styles.submitButton}
          >
            המשך
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white[100],
    alignItems: 'center',
  },
  progressContainer: {
    position: 'absolute',
    top: 73,
    width: 327,
    height: 8,
    zIndex: 10,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.offWhite[100],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarActive: {
    backgroundColor: colors.lightBlue[100],
  },
  content: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    marginTop: 128,
    width: 327,
    alignSelf: 'center',
    flexDirection: 'column',
    gap: spacing['2xl'],
    zIndex: 5,
    paddingBottom: spacing['2xl'],
  },
  header: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDarkest,
    letterSpacing: 0.24,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  form: {
    flexDirection: 'column',
    gap: spacing.xl,
    width: '100%',
  },
  fieldGroup: {
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  },
  fieldLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'right',
    width: '100%',
  },
  selectionGroup: {
    flexDirection: 'column',
    gap: spacing.lg,
    width: '100%',
  },
  optionsList: {
    flexDirection: 'column',
    gap: spacing.md,
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
  },
  optionLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    flex: 1,
  },
  radio: {
    width: 15,
    height: 15,
    borderRadius: borderRadius.full,
    borderWidth: 0.313,
    borderColor: 'rgba(1, 0, 37, 0.3)',
    backgroundColor: colors.white[100],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioActive: {
    backgroundColor: colors.white[100],
  },
  radioInner: {
    width: 7,
    height: 7,
    borderRadius: borderRadius.full,
    backgroundColor: colors.lightBlue[100],
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 3.75,
    borderWidth: 0.313,
    borderColor: 'rgba(1, 0, 37, 0.3)',
    backgroundColor: colors.white[100],
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxActive: {
    backgroundColor: colors.lightBlue[100],
    borderColor: colors.lightBlue[100],
  },
  submitButton: {
    marginTop: spacing.sm,
  },
});
