import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import FormGroup from '@/components/shared/FormGroup';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import ChevronDownIcon from '@/assets/icons/ui/chevron-down.svg';

export default function PersonalInfoUpdate() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [lang, setLang] = useState<'HEB' | 'EN'>('HEB');
  const [formData, setFormData] = useState({
    firstName: 'ישראל',
    lastName: 'ישראלי',
    email: 'israeliisraeli@gmail.com',
    phone: '0526477735',
    weight: '5',
    fins: '37',
    suit: 'XL',
  });

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

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="dark" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsWrapper} activeOpacity={0.7}>
          <SettingsIcon width={28} height={28} fill={colors.lightBlue[100]} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.title}>תמיכה והגדרות</Text>
          <Text style={styles.subtitle}>איך אפשר לעזור?</Text>
          <Text style={styles.description}>
            אנחנו כאן לשאלות, עזרה טכנית וכל דבר שקשור במערכת דולפין.
          </Text>
        </View>

        {/* Language Selection */}
        <View style={styles.langSelector}>
          <TouchableOpacity
            style={[styles.langBtn, lang === 'HEB' && styles.activeLang]}
            onPress={() => setLang('HEB')}
            activeOpacity={0.7}
          >
            <Text style={styles.flagIcon}>🇮🇱</Text>
            <Text style={[styles.langBtnText, lang === 'HEB' && styles.activeLangText]}>
              עברית (HEB)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.langBtn, lang === 'EN' && styles.activeLang]}
            onPress={() => setLang('EN')}
            activeOpacity={0.7}
          >
            <Text style={styles.flagIcon}>🇺🇸</Text>
            <Text style={[styles.langBtnText, lang === 'EN' && styles.activeLangText]}>
              English (EN)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Section */}
        <View style={styles.emergencyCard}>
          <LinearGradient
            colors={['#ffcfd6', '#ffb3c1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emergencyCardGradient}
          >
            <Text style={styles.cardTitle}>מצב חירום?</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                פרטי התקשרות בחירום{'\n'}
                <Text style={styles.boldText}>לחברת הביטוח DiveAssure:</Text>{'\n'}
                מוקד החירום שלנו עומד לרשותך 24/7{'\n'}
                כאשר מחייגים מישראל אנא חייגו 1-809-457-276{'\n'}
                כאשר מחייגים מכל מקום אחר בעולם אנא חייגו{'\n'}
                <Text style={styles.boldText}>1-319-448-3483+</Text>
              </Text>
              <TouchableOpacity
                style={styles.dialBtn}
                onPress={() => handleCall('1-809-457-276')}
                activeOpacity={0.8}
              >
                <PhoneIcon width={18} height={18} fill="#ffffff" />
                <Text style={styles.dialBtnText}>חיוג</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Contact Links */}
        <View style={styles.contactLinks}>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>דוא"ל תמיכה - יישומון דולפין</Text>
            <Text style={styles.contactValue}>support@divedolphin.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>אתר האינטרנט דולפין</Text>
            <Text style={styles.contactValue}>divedolphin.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>טלפון חברת הביטוח - Dive Assure</Text>
            <Text style={styles.contactValue}>1-809-457-278</Text>
          </View>
        </View>

        {/* Personal Details Form */}
        <View style={styles.personalBox}>
          <Text style={styles.boxTitle}>פרטים אישיים</Text>

          <FormGroup label="שם פרטי">
            <Input
              value={formData.firstName}
              onChangeText={(val) => setFormData({ ...formData, firstName: val })}
              textAlign="right"
            />
          </FormGroup>

          <FormGroup label="שם משפחה">
            <Input
              value={formData.lastName}
              onChangeText={(val) => setFormData({ ...formData, lastName: val })}
              textAlign="right"
            />
          </FormGroup>

          <FormGroup label="דוא״ל">
            <Input
              value={formData.email}
              onChangeText={(val) => setFormData({ ...formData, email: val })}
              type="email"
              textAlign="right"
            />
          </FormGroup>

          <FormGroup label="טלפון">
            <View style={styles.phoneGroup}>
              <Input
                value={formData.phone}
                onChangeText={(val) => setFormData({ ...formData, phone: val })}
                style={styles.phoneInput}
                textAlign="right"
              />
              <View style={styles.countryCode}>
                <Text style={styles.countryFlag}>🇮🇱</Text>
                <Text style={styles.countryCodeText}>+972</Text>
                <ChevronDownIcon width={12} height={12} fill={colors.primaryDarkest} />
              </View>
            </View>
          </FormGroup>

          <FormGroup label="משקולות (lb)">
            <Input
              value={formData.weight}
              onChangeText={(val) => setFormData({ ...formData, weight: val })}
              keyboardType="numeric"
              textAlign="right"
            />
          </FormGroup>

          <View style={styles.row}>
            <FormGroup label="מידת סנפירים">
              <Input
                value={formData.fins}
                onChangeText={(val) => setFormData({ ...formData, fins: val })}
                keyboardType="numeric"
                textAlign="right"
              />
            </FormGroup>
            <FormGroup label="מידת חליפת צלילה">
              <Input
                value={formData.suit}
                onChangeText={(val) => setFormData({ ...formData, suit: val })}
                textAlign="right"
              />
            </FormGroup>
          </View>

          <Button variant="primary" fullWidth size="md" style={styles.saveBtn}>
            שמור שינויים
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
    backgroundColor: colors.white[100],
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  settingsWrapper: {
    padding: spacing.sm,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: spacing.xl,
    flexDirection: 'column',
    gap: spacing.xl,
  },
  titleSection: {
    textAlign: 'center',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes['2xl'],
    fontWeight: '800',
    color: colors.primaryDarkest,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  description: {
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    lineHeight: 20,
    marginHorizontal: 'auto',
    maxWidth: 300,
  },
  langSelector: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  langBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: 'rgba(13, 10, 44, 0.1)',
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  activeLang: {
    backgroundColor: colors.offWhite[100],
    borderColor: colors.primaryDarkest,
    ...shadows.sm,
  },
  flagIcon: {
    fontSize: 18,
  },
  langBtnText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.neutral.medium,
  },
  activeLangText: {
    color: colors.primaryDarkest,
  },
  emergencyCard: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  emergencyCardGradient: {
    padding: spacing.xl,
    flexDirection: 'column',
    gap: spacing.lg,
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '800',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  cardContent: {
    flexDirection: 'column',
    gap: spacing.lg,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.primaryDarkest,
    textAlign: 'right',
  },
  boldText: {
    fontWeight: '700',
  },
  dialBtn: {
    backgroundColor: colors.error,
    color: colors.white[100],
    height: 44,
    paddingHorizontal: 40,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    alignSelf: 'center',
    ...shadows.md,
  },
  dialBtnText: {
    fontFamily: typography.fontFamilies.main,
    fontWeight: '800',
    fontSize: typography.sizes.base,
    color: colors.white[100],
  },
  contactLinks: {
    flexDirection: 'column',
    gap: spacing.lg,
    textAlign: 'right',
  },
  contactItem: {
    flexDirection: 'column',
    gap: 4,
  },
  contactLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: '800',
    color: colors.primaryDarkest,
  },
  contactValue: {
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  personalBox: {
    backgroundColor: colors.offWhite[100],
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    flexDirection: 'column',
    gap: spacing.md,
  },
  boxTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xl,
    fontWeight: '800',
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  phoneGroup: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
  },
  phoneInput: {
    flex: 1,
  },
  countryCode: {
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: 'rgba(13, 10, 44, 0.05)',
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
  },
  countryFlag: {
    fontSize: 18,
  },
  countryCodeText: {
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  saveBtn: {
    marginTop: spacing.lg,
  },
});
