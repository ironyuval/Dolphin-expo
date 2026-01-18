import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBar from '@/components/shared/StatusBar';
import BottomNav from '@/components/shared/BottomNav';
import { colors, typography, spacing, borderRadius, shadows } from '@/constants/design-system';
import SettingsIcon from '@/assets/icons/social/settings.svg';
import CircleArrowLeft from '@/assets/icons/ui/circle-arrow-left.svg';

const courseTree = {
  root: {
    id: 'star-1',
    name: 'קורס כוכב אחד',
    stars: 1,
    status: 'completed',
  },
  level2Left: {
    id: 'star-2',
    name: 'קורס כוכב שני',
    stars: 2,
    status: 'available',
    subtitle: 'הסמכה לקבלת נכסים וסכסות',
    children: [
      { id: 'rescue', name: 'התמחות עוזר ראשונה וחילוץ', stars: 2 },
      { id: 'navigation', name: 'התמחות לנווט שוני והלות', stars: 2 },
    ],
    level3: [
      { id: 'deep', name: 'עוזר מדריך', stars: 2 },
      { id: 'night', name: 'התמחות צלילת שלות', stars: 2 },
      { id: 'wreck', name: 'דייבר מאסטר-דימ׳תני צלילה', stars: 2 },
      { id: 'photo', name: 'התמחות ספיסיפיק סכסות', stars: 2 },
      { id: 'search', name: 'מדריכי קורסים', stars: 2 },
      { id: 'biology', name: 'התמחות סקופרס מדריכים', stars: 2 },
      { id: 'rescue-diver', name: 'מאסטר-דייבר- אולי כל בטי', stars: 2 },
    ],
  },
  level2Right: [
    { id: 'spec-1', name: 'התמחות ניווט והלות', stars: 1 },
    { id: 'spec-2', name: 'התמחות אייקון', stars: 1 },
    { id: 'spec-3', name: 'התמחות ניווט', stars: 1 },
    { id: 'spec-4', name: 'התמחות צלילם', stars: 1 },
    { id: 'spec-5', name: 'התמחות סובן ים', stars: 1 },
    { id: 'spec-6', name: 'התמחות לילה', stars: 1 },
  ],
};

export default function DivingCoursesTree() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const renderStars = (count: number) => {
    return '★'.repeat(count);
  };

  return (
    <LinearGradient
      colors={[colors.lightBlue[100], '#245C89']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.screen, { paddingBottom: 90 + insets.bottom }]}
    >
      <StatusBar variant="light" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <CircleArrowLeft width={24} height={24} fill="#ffffff" style={styles.backBtn} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(auth)/language')} activeOpacity={0.7}>
            <SettingsIcon width={20} height={20} fill="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>עץ קורסי צלילה</Text>
          <Text style={styles.subtitle}>איזה קורסים אפשר לעשות ומתי</Text>
        </View>
      </View>

      {/* Tree Container */}
      <ScrollView
        style={styles.treeContainer}
        contentContainerStyle={styles.treeContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Root Node - Star 1 (Completed) */}
        <View style={styles.treeSection}>
          <View style={[styles.courseCard, styles.completed]}>
            <Text style={styles.cardTitle}>{courseTree.root.name}</Text>
            <Text style={styles.stars}>{renderStars(courseTree.root.stars)}</Text>
          </View>
          <View style={styles.connector} />
        </View>

        {/* Split into two branches */}
        <View style={styles.branchContainer}>
          {/* Left Branch - Star 2 */}
          <View style={styles.leftBranch}>
            <View style={styles.splitConnectorLeft}>
              <View style={styles.splitConnectorVertical} />
            </View>
            <View style={[styles.courseCard, styles.available]}>
              <Text style={[styles.cardTitle, styles.availableTitle]}>
                {courseTree.level2Left.name}
              </Text>
              <Text style={[styles.stars, styles.availableStars]}>
                {renderStars(courseTree.level2Left.stars)}
              </Text>
            </View>
            <View style={styles.connector} />

            {/* OR/AND label */}
            <Text style={styles.connectorLabel}>או/ו</Text>
            <View style={styles.connector} />

            {/* Level 2 Children */}
            {courseTree.level2Left.children.map((child, idx) => (
              <React.Fragment key={child.id}>
                <View style={[styles.courseCard, styles.available]}>
                  <Text style={[styles.cardTitle, styles.availableTitle]}>{child.name}</Text>
                  <Text style={[styles.stars, styles.availableStars]}>
                    {renderStars(child.stars)}
                  </Text>
                </View>
                {idx < courseTree.level2Left.children.length - 1 && (
                  <>
                    <View style={styles.connector} />
                    <Text style={styles.connectorLabel}>או/ו</Text>
                    <View style={styles.connector} />
                  </>
                )}
              </React.Fragment>
            ))}

            <View style={styles.connector} />

            {/* Level 3 Grid */}
            <View style={styles.level3Grid}>
              {courseTree.level2Left.level3.map((course) => (
                <View key={course.id} style={[styles.miniCard, styles.available]}>
                  <Text style={[styles.miniCardTitle, styles.availableTitle]}>{course.name}</Text>
                  <Text style={[styles.miniStars, styles.availableStars]}>
                    {renderStars(course.stars)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Right Branch - Specializations */}
          <View style={styles.rightBranch}>
            <View style={styles.splitConnectorRight}>
              <View style={styles.splitConnectorVertical} />
            </View>

            {courseTree.level2Right.map((spec, idx) => (
              <React.Fragment key={spec.id}>
                <View style={[styles.courseCard, styles.completed]}>
                  <Text style={styles.cardTitle}>{spec.name}</Text>
                  <Text style={styles.stars}>{renderStars(spec.stars)}</Text>
                </View>
                {idx < courseTree.level2Right.length - 1 && (
                  <>
                    <View style={styles.connector} />
                    <Text style={styles.connectorLabel}>או/ו</Text>
                    <View style={styles.connector} />
                  </>
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
  header: {
    paddingTop: 58,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backBtn: {
    transform: [{ rotate: '0deg' }],
  },
  titleSection: {
    textAlign: 'right',
  },
  title: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 24,
    fontWeight: '500',
    color: colors.white[100],
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '400',
    color: colors.white[100],
    opacity: 0.9,
    lineHeight: 20,
  },
  treeContainer: {
    flex: 1,
  },
  treeContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  treeSection: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 280,
  },
  courseCard: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    ...shadows.sm,
    textAlign: 'center',
  },
  completed: {
    backgroundColor: colors.white[100],
  },
  available: {
    backgroundColor: 'rgba(62, 157, 234, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.primaryDarkest,
    lineHeight: 18,
    textAlign: 'center',
  },
  availableTitle: {
    color: colors.white[100],
  },
  stars: {
    fontSize: 16,
    color: colors.primaryDarkest,
    lineHeight: 16,
  },
  availableStars: {
    color: '#FFD700',
  },
  connector: {
    width: 2,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    margin: 0,
  },
  connectorLabel: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.white[100],
    paddingVertical: 4,
  },
  branchContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    width: '100%',
    maxWidth: 340,
    alignItems: 'flex-start',
    position: 'relative',
  },
  leftBranch: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightBranch: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  splitConnectorLeft: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: spacing.sm,
    alignSelf: 'flex-end',
    position: 'relative',
  },
  splitConnectorRight: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
    position: 'relative',
  },
  splitConnectorVertical: {
    position: 'absolute',
    width: 2,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    top: -40,
  },
  level3Grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    width: '100%',
    marginTop: spacing.sm,
  },
  miniCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(62, 157, 234, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    textAlign: 'center',
  },
  miniCardTitle: {
    fontFamily: typography.fontFamilies.main,
    fontSize: 11,
    fontWeight: '400',
    color: colors.white[100],
    lineHeight: 13,
    textAlign: 'center',
  },
  miniStars: {
    fontSize: 12,
    color: '#FFD700',
    lineHeight: 12,
  },
});
