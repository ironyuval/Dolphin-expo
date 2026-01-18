import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import PhoneIcon from '@/assets/icons/phone.svg';

export default function ContactSupport() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState<'he' | 'en'>('he');
  const [formData, setFormData] = useState({
    name: '',
    country: 'ישראל',
    email: '',
    phone: '',
    wetsuitThickness: 'XL',
    wetsuitFit: '37',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleCall = async (phone: string) => {
    try {
      const phoneNumber = phone.replace(/[^0-9+]/g, '');
      const url = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening phone dialer:', error);
    }
  };

  const handleEmail = async (email: string) => {
    try {
      const url = `mailto:${email}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="light" />

      {/* Header */}
      <LinearGradient
        colors={[colors.lightBlue[100], '#245C89']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.settingsWrapper}
          onPress={() => router.push('/(auth)/language')}
          activeOpacity={0.7}
        >
          <SettingsIcon width={20} height={20} fill="#ffffff" />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>תמיכה והגדרות</Text>
          <Text style={styles.subtitle}>אין אפשר לעזור</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Language Toggle */}
        <View style={styles.languageSection}>
          <Text style={styles.languagePrompt}>
            אנחנו כאן לאסוף את עזרה מתמידה לרלב ולקבל כל צעד שאתה משתמשת בהצלחה הולכת
          </Text>
          <View style={styles.languageToggle}>
            <TouchableOpacity
              style={[
                styles.langBtn,
                selectedLanguage === 'he' && styles.langBtnActive,
              ]}
              onPress={() => setSelectedLanguage('he')}
              activeOpacity={0.7}
            >
              <Text style={styles.langFlag}>🇮🇱</Text>
              <Text
                style={[
                  styles.langBtnText,
                  selectedLanguage === 'he' && styles.langBtnTextActive,
                ]}
              >
                עברית (HEB)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langBtn,
                selectedLanguage === 'en' && styles.langBtnActive,
              ]}
              onPress={() => setSelectedLanguage('en')}
              activeOpacity={0.7}
            >
              <Text style={styles.langFlag}>🇬🇧</Text>
              <Text
                style={[
                  styles.langBtnText,
                  selectedLanguage === 'en' && styles.langBtnTextActive,
                ]}
              >
                English (EN)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency Support Card */}
        <View style={styles.emergencyCard}>
          <LinearGradient
            colors={['#FFE5E5', '#FFD1D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emergencyCardGradient}
          >
            <Text style={styles.emergencyTitle}>מצב חירום!</Text>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyText}>
                פנייה באיתמשות דורבחת{'\n'}
                למבצע הביטחח DiveAssure למבצעת{'\n'}
                להורדא למצוח מילוי ב-24/7{'\n'}
                גברטו מול המדינות מול מחוץ למערד מדינה עוכב התנדו מקומי בשלושה חיותים:{'\n'}
                1-809-457-276 (איבח יכתב רו-יא אל אכן){'\n'}
                או +1-319-448-3483
              </Text>
              <TouchableOpacity
                style={styles.emergencyCallBtn}
                onPress={() => handleCall('1-809-457-276')}
                activeOpacity={0.8}
              >
                <PhoneIcon width={20} height={20} fill="#ffffff" />
                <Text style={styles.emergencyCallBtnText}>התקשר</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Insurance Info Section 1 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>דיבר האבה - שירותינו - DiveAssure</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>פרטי האמייל:</Text>
            <TouchableOpacity onPress={() => handleEmail('support@divedolphin.com')}>
              <Text style={styles.infoLink}>support@divedolphin.com</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>למעת מבצרות לא דרובות:</Text>
            <TouchableOpacity onPress={() => handleEmail('dived@lphin.com')}>
              <Text style={styles.infoLink}>dived@lphin.com</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Insurance Info Section 2 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>סליסח גלווב הבטחה - DiveAssure</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>1-809-457-278</Text>
          </View>
        </View>

        {/* Personal Details Form */}
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>פרטים אישיים</Text>

          <View style={styles.formGroup}>
            <Input
              label="שם פרטי"
              value={formData.name}
              onChangeText={(val) => handleInputChange('name', val)}
              placeholder="ישראל"
              textAlign="right"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>מדינה</Text>
            <View style={styles.countryInput}>
              <Text style={styles.countryFlag}>🇮🇱</Text>
              <Text style={styles.countryValue}>{formData.country}</Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Input
              label="אימייל"
              type="email"
              value={formData.email}
              onChangeText={(val) => handleInputChange('email', val)}
              placeholder="israelisrael@gmail.com"
              textAlign="right"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>טלפון</Text>
            <View style={styles.phoneInput}>
              <Input
                value={formData.phone}
                onChangeText={(val) => handleInputChange('phone', val)}
                placeholder="0526477235"
                textAlign="right"
                style={styles.phoneInputField}
              />
              <View style={styles.phonePrefix}>
                <Text style={styles.countryFlag}>🇮🇱</Text>
                <Text style={styles.phonePrefixText}>+972</Text>
              </View>
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={styles.formGroupHalf}>
              <Input
                label="חליפת הורטסוטס"
                value={formData.wetsuitFit}
                onChangeText={(val) => handleInputChange('wetsuitFit', val)}
                textAlign="right"
              />
            </View>
            <View style={styles.formGroupHalf}>
              <Input
                label="חליפת הורטסוטס גולש"
                value={formData.wetsuitThickness}
                onChangeText={(val) => handleInputChange('wetsuitThickness', val)}
                textAlign="right"
              />
            </View>
          </View>

          <Button variant="primary" fullWidth onPress={handleSubmit}>
            שמור עדכונים
          </Button>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.offWhite[100],
  },
  header: {
    height: 140,
    position: 'relative',
    paddingTop: 58,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  settingsWrapper: {
    position: 'absolute',
    top: 58,
    left: 21,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  titleWrapper: {
    position: 'absolute',
    bottom: -40,
    backgroundColor: colors.white[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
    borderRadius: borderRadius.lg,
    ...shadows.md,
    zIndex: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.neutral.medium,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    flexDirection: 'column',
    gap: spacing.xl,
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  languageSection: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  languagePrompt: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
    lineHeight: 21,
  },
  languageToggle: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: colors.offWhite[100],
    borderRadius: borderRadius.md,
  },
  langBtnActive: {
    backgroundColor: colors.lightBlue[100],
    borderColor: colors.lightBlue[100],
  },
  langFlag: {
    fontSize: 18,
  },
  langBtnText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  langBtnTextActive: {
    color: colors.white[100],
  },
  emergencyCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  emergencyCardGradient: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(235, 87, 87, 0.1)',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  emergencyTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  emergencyContent: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  emergencyText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 13,
    fontWeight: '400',
    color: colors.primaryDarkest,
    lineHeight: 21,
    textAlign: 'center',
  },
  emergencyCallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
  },
  emergencyCallBtnText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.white[100],
  },
  infoSection: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  infoTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: colors.primaryDarkest,
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'column',
    gap: 4,
    marginBottom: spacing.sm,
  },
  infoLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.neutral.medium,
  },
  infoLink: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.lightBlue[100],
  },
  infoValue: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  formSection: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  formTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryDarkest,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  formGroupHalf: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.primaryDarkest,
    marginBottom: spacing.sm,
  },
  countryInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 48,
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryValue: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
  },
  phoneInput: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInputField: {
    paddingLeft: 80,
  },
  phonePrefix: {
    position: 'absolute',
    left: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    zIndex: 1,
  },
  phonePrefixText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.neutral.medium,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
});
