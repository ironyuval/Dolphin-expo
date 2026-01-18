import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import BackgroundImage from '@/components/shared/BackgroundImage';
import Checkbox from '@/components/shared/Checkbox';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import AuthBg from '@/assets/backgrounds/auth-main-bg.svg';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import GoogleIcon from '@/assets/icons/social/icon-google.png';
import AppleIcon from '@/assets/icons/social/apple.svg';
import ShowPasswordIcon from '@/assets/icons/ui/show_password.svg';
import FishGroup1 from '@/assets/decorative/fish-group-1.svg';
import FishGroup2 from '@/assets/decorative/fish-group-2.svg';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    router.push('/(tabs)');
  };

  return (
    <BackgroundImage src={AuthBg} style={styles.container}>
      <StatusBar variant="light" />

      <TouchableOpacity
        style={styles.settingsWrapper}
        onPress={() => router.push('/(auth)/language')}
        activeOpacity={0.7}
      >
        <SettingsIcon width={20} height={20} fill="#ffffff" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>התחברות</Text>

          <View style={styles.form}>
            <Input
              type="email"
              placeholder="מייל"
              value={email}
              onChangeText={setEmail}
              textAlign="right"
            />

            <View style={styles.passwordSection}>
              <Input
                type="password"
                placeholder="סיסמה"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                icon={ShowPasswordIcon}
                iconPosition="start"
                onIconPress={() => setShowPassword(!showPassword)}
                textAlign="right"
              />

              <View style={styles.formHelper}>
                <Checkbox
                  label="זכור אותי"
                  checked={rememberMe}
                  onChange={setRememberMe}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.forgotPassword}>שכחת סיסמה?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.loginSection}>
              <Button variant="white" fullWidth onPress={handleSubmit}>
                התחברות
              </Button>
              <Text style={styles.signupLink}>
                עוד לא חבר בדולפין?{' '}
                <Text
                  style={styles.signupLinkBold}
                  onPress={() => router.push('/(auth)/register')}
                >
                  הרשם עכשיו
                </Text>
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.socialSection}>
              <Text style={styles.socialTitle}>או המשך עם</Text>
              <View style={styles.socialButtons}>
                <Button variant="social">
                  <Image source={GoogleIcon} style={styles.socialIcon} />
                </Button>
                <Button variant="apple">
                  <AppleIcon width={24} height={24} fill="#ffffff" />
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.fishGroup1}>
        <FishGroup1 width={120} height={80} opacity={0.25} />
      </View>
      <View style={styles.fishGroup2}>
        <FishGroup2 width={100} height={60} opacity={0.2} />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
  },
  content: {
    marginTop: 128,
    width: 327,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 32,
    zIndex: 10,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  form: {
    width: '100%',
    flexDirection: 'column',
    gap: 20,
  },
  passwordSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.md,
  },
  formHelper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPassword: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  loginSection: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.md,
    alignItems: 'center',
  },
  signupLink: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: '#ffffff',
    textAlign: 'center',
  },
  signupLinkBold: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: spacing.lg,
  },
  socialSection: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.md,
  },
  socialTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: '#ffffff',
    textAlign: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  fishGroup1: {
    position: 'absolute',
    top: 200,
    right: -30,
    width: 120,
    height: 80,
    zIndex: 1,
  },
  fishGroup2: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    width: 100,
    height: 60,
    zIndex: 1,
  },
});
