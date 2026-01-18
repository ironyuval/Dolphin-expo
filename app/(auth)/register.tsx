import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import ShowPasswordIcon from '@/assets/icons/ui/show_password.svg';
import Svg, { Path } from 'react-native-svg';

const ChevronDown = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <Path d="M6 9l6 6 6-6" stroke="#010025" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'il' | 'us'>('il');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const countryData = {
    il: { flag: 'https://flagcdn.com/w40/il.png', prefix: '+972' },
    us: { flag: 'https://flagcdn.com/w40/us.png', prefix: '+1' },
  };

  const toggleCountry = () => {
    setSelectedCountry(selectedCountry === 'il' ? 'us' : 'il');
  };

  const handleSubmit = () => {
    router.push('/(auth)/register-completed');
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <StatusBar variant="dark" />

      <TouchableOpacity
        style={styles.settingsWrapper}
        onPress={() => router.push('/(auth)/language')}
        activeOpacity={0.7}
      >
        <SettingsIcon width={20} height={20} fill="#000000" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>הרשמה</Text>

          <View style={styles.form}>
            <Input
              label="שם פרטי"
              value={firstName}
              onChangeText={setFirstName}
              textAlign="right"
            />

            <Input
              label="שם משפחה"
              value={lastName}
              onChangeText={setLastName}
              textAlign="right"
            />

            <Input
              label="תאריך לידה"
              placeholder="dd/mm/yy"
              value={birthDate}
              onChangeText={setBirthDate}
              textAlign="left"
              placeholderAlign="left"
            />

            <Input
              label="טלפון"
              value={phone}
              onChangeText={setPhone}
              textAlign="left"
              customPrefix={
                <TouchableOpacity style={styles.phonePrefix} onPress={toggleCountry} activeOpacity={0.7}>
                  <Text style={styles.prefixNumber}>{countryData[selectedCountry].prefix}</Text>
                  <ChevronDown />
                  <View style={styles.flagCircleWrapper}>
                    <Image
                      source={{ uri: countryData[selectedCountry].flag }}
                      style={styles.flagCircle}
                    />
                  </View>
                  <View style={styles.prefixDivider} />
                </TouchableOpacity>
              }
            />

            <Input
              label="מייל"
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChangeText={setEmail}
              textAlign="left"
              placeholderAlign="left"
            />

            <View style={styles.passwordSection}>
              <Input
                label="סיסמה"
                type="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                icon={ShowPasswordIcon}
                iconPosition="start"
                onIconPress={() => setShowPassword(!showPassword)}
                textAlign="right"
              />
            </View>

            <Input
              label="אימות סיסמה"
              type="password"
              placeholder="הסיסמה פעם נוספת"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              icon={ShowPasswordIcon}
              iconPosition="start"
              onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
              textAlign="right"
            />

            <View style={styles.actionSection}>
              <Button variant="primary" fullWidth onPress={handleSubmit}>
                המשך
              </Button>
              <Text style={styles.loginLink}>
                כבר חבר בדולפין?{' '}
                <Text
                  style={styles.loginLinkBold}
                  onPress={() => router.push('/(auth)/login')}
                >
                  התחבר עכשיו
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.offWhite[100],
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing['4xl'],
  },
  settingsWrapper: {
    position: 'absolute',
    left: 21,
    top: 58,
    width: 32,
    height: 32,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: borderRadius.full,
  },
  content: {
    width: 327,
    marginTop: 128,
    marginBottom: spacing['4xl'],
    alignSelf: 'center',
    flexDirection: 'column',
    gap: spacing['2xl'],
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    width: '100%',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
  },
  passwordSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.sm,
    height: '100%',
  },
  flagCircleWrapper: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  flagCircle: {
    width: '100%',
    height: '100%',
  },
  prefixNumber: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: colors.primaryDarkest,
    fontWeight: '500',
  },
  prefixDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(1, 0, 37, 0.1)',
    marginRight: 4,
  },
  actionSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginLink: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    color: '#000000',
    textAlign: 'center',
  },
  loginLinkBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
