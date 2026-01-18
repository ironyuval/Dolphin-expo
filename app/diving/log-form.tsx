import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import SuccessModal from '@/components/shared/SuccessModal';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import EmergencyIcon from '@/assets/icons/emergency.svg';

export default function DivingLogForm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '01.04.2025',
    site: '',
    entryTime: '00:00',
    exitTime: '00:00',
    bottomTime: '43',
    weight: '6',
    safetyStop: true,
    description: '',
    buddy: '',
  });

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const handleSuccessClick = () => {
    setShowSuccess(false);
    router.push('/diving/log-view');
  };

  return (
    <View style={[styles.screen, { paddingBottom: 100 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.emergencyWrapper}
          onPress={() => router.push('/features/emergency')}
          activeOpacity={0.7}
        >
          <EmergencyIcon width={26} height={26} fill={colors.primaryDarkest} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.title}>יומן צלילה</Text>
          <Text style={styles.subtitle}>צלילה מס' 5</Text>
        </View>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>תאריך</Text>
            <View style={styles.readOnlyField}>
              <Text style={styles.fieldValue}>{formData.date}</Text>
            </View>
          </View>

          <Input
            label="אתר צלילה"
            value={formData.site}
            onChangeText={(val) => setFormData({ ...formData, site: val })}
            placeholder="שם האתר"
            textAlign="right"
          />

          <View style={styles.doubleField}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>שעת יציאה</Text>
              <View style={styles.timeInputWrapper}>
                <Text style={styles.timeValue}>{formData.exitTime}</Text>
              </View>
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>שעת כניסה</Text>
              <View style={styles.timeInputWrapper}>
                <Text style={styles.timeValue}>{formData.entryTime}</Text>
              </View>
            </View>
          </View>

          <View style={styles.doubleField}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>
                כמות משקולות <Text style={styles.unit}>(lb)</Text>
              </Text>
              <View style={styles.timeInputWrapper}>
                <Text style={styles.timeValue}>{formData.weight}</Text>
              </View>
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>
                זמן תחתית <Text style={styles.unit}>(min)</Text>
              </Text>
              <View style={styles.timeInputWrapper}>
                <Text style={styles.timeValue}>{formData.bottomTime}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setFormData({ ...formData, safetyStop: !formData.safetyStop })}
            activeOpacity={0.7}
          >
            <Text style={styles.checkboxLabel}>חניית בטיחות</Text>
            <View style={[styles.customCheckbox, formData.safetyStop && styles.checked]}>
              {formData.safetyStop && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>תיאור הצלילה</Text>
            <TextInput
              style={styles.textarea}
              placeholder="תארו את החוויה בכמה מילים"
              placeholderTextColor="rgba(1, 0, 37, 0.5)"
              value={formData.description}
              onChangeText={(val) => setFormData({ ...formData, description: val })}
              multiline
              textAlign="right"
            />
          </View>

          <Input
            label="באדי"
            value={formData.buddy}
            onChangeText={(val) => setFormData({ ...formData, buddy: val })}
            placeholder="שם"
            textAlign="right"
          />

          <View style={styles.squareActions}>
            <View style={styles.squareItem}>
              <Text style={styles.label}>חתימה דיגיטלית</Text>
              <TouchableOpacity style={styles.signatureBox} activeOpacity={0.7}>
                <Text style={styles.signatureMock}>lu</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.squareItem}>
              <Text style={styles.label}>הוספת מדיה</Text>
              <TouchableOpacity style={styles.mediaBox} activeOpacity={0.7}>
                <Text style={styles.mediaIcon}>📷</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Button variant="primary" fullWidth onPress={handleSubmit} style={styles.submitBtn}>
            שמור
          </Button>
        </View>
      </ScrollView>

      <BottomNav />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="הפעולה בוצעה בהצלחה"
        description="לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית נולום ארווס סאפיאן."
        onButtonClick={handleSuccessClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white[100],
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    position: 'relative',
    alignItems: 'center',
  },
  emergencyWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  headerTitles: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: spacing.xl,
    width: '100%',
    maxWidth: 327,
    alignSelf: 'center',
    paddingBottom: spacing['2xl'],
  },
  form: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  fieldGroup: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  label: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  unit: {
    fontWeight: '400',
  },
  readOnlyField: {
    height: 48,
    backgroundColor: colors.offWhite[100],
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.3)',
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  fieldValue: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
  },
  doubleField: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  fieldHalf: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  timeInputWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.15)',
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white[100],
  },
  timeValue: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    opacity: 0.5,
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: 4,
  },
  checkboxLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  customCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.3)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white[100],
  },
  checked: {
    backgroundColor: colors.lightBlue[100],
    borderColor: colors.lightBlue[100],
  },
  checkMark: {
    color: colors.white[100],
    fontSize: 12,
    fontWeight: '700',
  },
  textarea: {
    width: '100%',
    minHeight: 48,
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.15)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    backgroundColor: colors.white[100],
    textAlign: 'right',
  },
  squareActions: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  squareItem: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.sm,
  },
  signatureBox: {
    height: 72,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.offWhite[100],
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.3)',
  },
  signatureMock: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    color: colors.primaryDarkest,
    opacity: 0.8,
  },
  mediaBox: {
    height: 72,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.15)',
  },
  mediaIcon: {
    fontSize: 24,
    opacity: 0.15,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
});
