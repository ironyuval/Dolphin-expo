import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import Button from '@/components/shared/Button';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';

// Assets
const avatarImg = require('@/assets/photos/preview-frame.png');
const bannerImg = require('@/assets/backgrounds/bg-home-header.png');
const gallery1 = require('@/assets/photos/gallery-1.png');
const gallery2 = require('@/assets/photos/gallery-2.png');
const gallery3 = require('@/assets/photos/gallery-3.png');
import SettingsIcon from '@/assets/icons/social/settings.svg';
import CircleArrowLeft from '@/assets/icons/ui/circle-arrow-left.svg';

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const dives = [
    { id: 1, title: 'צלילה חדשה', subtitle: 'ע"י מועדון מנטה', date: '01.04.2025', country: 'il' },
    { id: 2, title: 'מודעון מנטה', subtitle: 'ריף הדולפינים אילת, ישראל', date: '03.03.2025', country: 'il' },
    { id: 3, title: 'Zenobia Divers', subtitle: 'חוף לרנקה, קפריסין', date: '03.01.2025', country: 'cy' },
  ];

  const documents = [
    { id: 1, label: 'רישיון צלילה', count: 'נמצא מסמך 1' },
    { id: 2, label: 'ביטוחי צלילה', count: 'נמצאו 2 מסמכים' },
    { id: 3, label: 'תעודות התמחות', count: 'נמצאו 4 מסמכים' },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar variant="dark" />

      {/* Header Image */}
      <View style={styles.header}>
        <ImageBackground source={bannerImg} style={styles.headerImage} resizeMode="cover">
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image source={avatarImg} style={styles.avatar} />
            </View>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Settings Button */}
        <View style={styles.settingsRow}>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => router.push('/(auth)/language')}
            activeOpacity={0.7}
          >
            <SettingsIcon width={24} height={24} fill="#000000" />
          </TouchableOpacity>
        </View>

        {/* User Stats & Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.userName}>היי ישראל,</Text>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>0231616 |</Text>
            <Text style={styles.starsIcon}>★★★</Text>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.gearInfo}>חליפת צלילה M | סנפירים 37 | משקולות 6</Text>
            <View style={styles.diveStats}>
              <View style={styles.diveCountRow}>
                <Text style={styles.diveCount}>נכון להיום צללת 123 פעמים!</Text>
                <TouchableOpacity
                  style={styles.historyShortcut}
                  onPress={() => router.push('/diving/history')}
                  activeOpacity={0.7}
                >
                  <CircleArrowLeft width={20} height={20} fill={colors.primaryDarkest} />
                </TouchableOpacity>
              </View>
              <Text style={styles.refreshTitle}>רענון הצלילה הבא שלך עתיד להיות בעוד:</Text>
              <Text style={styles.refreshTime}>2 חודשים ו-12 ימים</Text>
            </View>
          </View>
        </View>

        {/* Promo Banner */}
        <View style={styles.banner}>
          <ImageBackground source={bannerImg} style={styles.bannerImage} resizeMode="cover">
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTag}>בלעדי לחברי דולפין</Text>
              <Text style={styles.bannerTitle}>ביטוח צלילה ב-10% הנחה!</Text>
              <Button variant="white" style={styles.bannerBtn} onPress={() => {}}>
                מעבר לרכישה
              </Button>
            </View>
          </ImageBackground>
        </View>

        {/* Diving History Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>היסטוריית צלילה</Text>
          </View>
          <View style={styles.historyList}>
            {dives.map((dive) => (
              <View key={dive.id} style={styles.historyCard}>
                <View style={styles.cardImagePlaceholder} />
                <View style={styles.cardContent}>
                  <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>{dive.title}</Text>
                    <Text style={styles.cardSubtitle}>{dive.subtitle}</Text>
                    <View style={styles.cardDateRow}>
                      <Text style={styles.calendarIcon}>📅</Text>
                      <Text style={styles.cardDate}>{dive.date}</Text>
                    </View>
                  </View>
                  <View style={styles.cardBadge}>
                    <Image
                      source={{ uri: `https://flagcdn.com/w80/${dive.country}.png` }}
                      style={styles.historyFlag}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => router.push('/diving/history')}>
            <Text style={styles.viewAllLink}>הצג הכל</Text>
          </TouchableOpacity>
        </View>

        {/* My Documents Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>המסמכים שלי</Text>
          </View>
          <View style={styles.docsList}>
            {documents.map((doc) => (
              <View key={doc.id} style={styles.docCard}>
                <Text style={styles.docLabel}>{doc.label}</Text>
                <Text style={styles.docCount}>{doc.count}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => router.push('/documents')}>
            <Text style={styles.viewAllLink}>הצג הכל</Text>
          </TouchableOpacity>
        </View>

        {/* Experiences Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>החוויות של ישראל</Text>
          </View>
          <View style={styles.galleryGrid}>
            <Image source={gallery1} style={styles.galleryImg} />
            <Image source={gallery2} style={styles.galleryImg} />
            <Image source={gallery3} style={styles.galleryImg} />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.loadMoreBtn}>טען עוד</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    gap: 25,
    paddingTop: 10,
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 160,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    right: spacing.xl,
    zIndex: 10,
  },
  avatarBorder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    borderWidth: 3,
    borderColor: '#ffffff',
    backgroundColor: 'white',
    overflow: 'hidden',
    ...shadows.md,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  settingsRow: {
    width: 327,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  settingsBtn: {
    padding: 0,
  },
  greetingSection: {
    width: 327,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  userName: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue[15],
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    gap: 4,
  },
  starsIcon: {
    color: colors.lightBlue[100],
    fontSize: typography.sizes.sm,
  },
  idText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  userInfo: {
    width: '100%',
    marginTop: spacing.md,
  },
  gearInfo: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '300',
    color: colors.primaryDarkest,
    marginBottom: spacing.lg,
  },
  diveStats: {
    flexDirection: 'column',
    gap: 4,
  },
  diveCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  diveCount: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  historyShortcut: {
    padding: 0,
    alignItems: 'center',
  },
  refreshTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  refreshTime: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '500',
    color: colors.primaryDarkest,
  },
  banner: {
    position: 'relative',
    width: 327,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bannerContent: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    padding: 0,
  },
  bannerTag: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.lg,
    fontWeight: '500',
    color: colors.white[100],
  },
  bannerTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '800',
    color: colors.white[100],
    textAlign: 'center',
  },
  bannerBtn: {
    width: 249,
    height: 48,
  },
  section: {
    width: 327,
    flexDirection: 'column',
    gap: spacing.lg,
  },
  sectionHeader: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  viewAllLink: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.primaryDark,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: spacing.sm,
  },
  historyList: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  historyCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  cardImagePlaceholder: {
    width: 74,
    height: 72,
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.lg,
    opacity: 0.3,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginLeft: spacing.md,
  },
  cardText: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '700',
    color: colors.primaryDarkest,
  },
  cardSubtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.primaryDarkest,
  },
  cardDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    opacity: 0.5,
  },
  calendarIcon: {
    fontSize: 14,
  },
  cardDate: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
  },
  cardBadge: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  historyFlag: {
    width: '100%',
    height: '100%',
  },
  docsList: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  docCard: {
    width: '100%',
    backgroundColor: colors.offWhite[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.base,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
  },
  docCount: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
    marginTop: 4,
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 14,
    justifyContent: 'center',
    width: '100%',
  },
  galleryImg: {
    width: 92,
    height: 92,
    borderRadius: 11,
  },
  loadMoreBtn: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '700',
    color: colors.primaryDark,
    textDecorationLine: 'underline',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
