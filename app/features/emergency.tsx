import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import EmergencyIcon from '@/assets/icons/emergency.svg';
import PhoneIcon from '@/assets/icons/phone.svg';

const emergencyNumbers = [
  { number: '100', label: 'חסמבר', type: 'police' },
  { number: '101', label: 'מד״א אזרח', type: 'medical' },
  { number: '102', label: 'משטרה אש', type: 'fire' },
];

const contactsList = {
  left: [
    { label: 'פלמיב - השירה באסטאת', phone: '04-9107107' },
    { label: 'חסרים - באת ים', phone: '04-9919875' },
    { label: 'יום השיבנא - פיקודיו שלי', phone: '04-9919287' },
    { label: 'מרפדה - פסגת עם סלים', phone: '04-9919252' },
    { label: 'חסרים - פסגת עם סלים', phone: '04-8518442' },
    { label: 'חסרים הורווטות', phone: '04-8866437' },
    { label: 'חמוטה - פסגח למבל', phone: '04-6827595' },
    { label: 'זאור מיבול', phone: '04-6823095' },
    { label: 'חסמבר - דס', phone: '03-6273780' },
    { label: 'חסמבר - פאר', phone: '08-6573780' },
  ],
  right: [
    { label: 'פסדרק מילולי - לות ייב', phone: '04-8225257' },
    { label: 'דיבח קורט - טייב קופבר', phone: '04-6464292' },
    { label: 'הורווטות מרה', phone: '05-9565935' },
    { label: 'משטבת - קילוביה', phone: '03-5644745' },
    { label: 'דם רב - יביסר יבי', phone: '03-5644745' },
    { label: 'משטבת - אבן', phone: '08-8512308' },
    { label: 'בדק דיבח', phone: '08-8557405' },
    { label: 'חסמבר ברוס', phone: '08-7787277' },
    { label: 'חסמבר - גילם', phone: '08-6361943' },
  ],
};

export default function Emergency() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [calling, setCalling] = useState<string | null>(null);

  const handleCall = async (phone: string) => {
    setCalling(phone);
    try {
      const phoneNumber = phone.replace(/[^0-9+]/g, '');
      const url = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening phone dialer:', error);
    } finally {
      setTimeout(() => setCalling(null), 500);
    }
  };

  return (
    <View style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}>
      <StatusBar variant="light" />

      {/* Header */}
      <LinearGradient
        colors={['#EB5757', '#B71C1C']}
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
          <View style={styles.iconCircle}>
            <EmergencyIcon width={32} height={32} fill="#EB5757" />
          </View>
          <Text style={styles.title}>חירום ונקודות תשובים</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Title */}
        <Text style={styles.mainTitle}>
          חירום ונקודות תשובים בורווטא מיידע האריצות, מבצבר התשובים
        </Text>

        {/* Three Emergency Buttons */}
        <View style={styles.emergencyButtons}>
          {emergencyNumbers.map((item) => (
            <TouchableOpacity
              key={item.number}
              style={styles.emergencyBtn}
              onPress={() => handleCall(item.number)}
              activeOpacity={0.8}
            >
              <Text style={styles.emergencyLabel}>{item.label}</Text>
              <Text style={styles.emergencyNumber}>{item.number}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Support Card */}
        <View style={styles.emergencyCard}>
          <LinearGradient
            colors={['#FFE5E5', '#FFD1D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.emergencyCardGradient}
          >
            <Text style={styles.emergencyCardTitle}>מצב חירום!</Text>
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
          </LinearGradient>
        </View>

        {/* Contacts Lists */}
        <View style={styles.contactsGrid}>
          <View style={styles.contactsColumn}>
            {contactsList.left.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactItem}
                onPress={() => handleCall(contact.phone)}
                activeOpacity={0.7}
              >
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.contactsColumn}>
            {contactsList.right.map((contact, index) => (
              <TouchableOpacity
                key={index}
                style={styles.contactItem}
                onPress={() => handleCall(contact.phone)}
                activeOpacity={0.7}
              >
                <Text style={styles.contactLabel}>{contact.label}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    height: 180,
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
    bottom: -60,
    backgroundColor: colors.white[100],
    paddingVertical: spacing.lg,
    paddingHorizontal: 40,
    borderRadius: borderRadius.lg,
    ...shadows.md,
    zIndex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(235, 87, 87, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 80,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    flexDirection: 'column',
    gap: spacing.xl,
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  mainTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
    lineHeight: 21,
  },
  emergencyButtons: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  emergencyBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.error,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  emergencyLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.white[100],
  },
  emergencyNumber: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.white[100],
  },
  emergencyCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  emergencyCardGradient: {
    padding: spacing.lg,
    flexDirection: 'column',
    gap: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(235, 87, 87, 0.1)',
  },
  emergencyCardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.primaryDarkest,
    textAlign: 'center',
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
  contactsGrid: {
    flexDirection: 'row',
    gap: spacing.xl,
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.sm,
  },
  contactsColumn: {
    flex: 1,
    flexDirection: 'column',
    gap: spacing.lg,
  },
  contactItem: {
    flexDirection: 'column',
    gap: 4,
  },
  contactLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
    lineHeight: 16,
  },
  contactPhone: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 13,
    fontWeight: '500',
    color: colors.lightBlue[100],
    textAlign: 'right',
  },
});
