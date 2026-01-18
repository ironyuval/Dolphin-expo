import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import StatusBar from '@/components/shared/StatusBar';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import SuccessModal from '@/components/shared/SuccessModal';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';
import Svg, { Path, Circle } from 'react-native-svg';

export default function ProfileSetup2() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [weights, setWeights] = useState('2');
  const [finSize, setFinSize] = useState('37');
  const [suitSize, setSuitSize] = useState('M');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handlePhotoUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'הרשאות',
          'נדרשת הרשאת גישה לגלריית התמונות',
          [{ text: 'אישור' }]
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setProfilePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('שגיאה', 'לא ניתן לפתוח את גלריית התמונות');
    }
  };

  const handleContinue = () => {
    setIsSuccessModalOpen(true);
  };

  const handleSuccessClick = () => {
    setIsSuccessModalOpen(false);
    router.push('/(tabs)');
  };

  return (
    <View style={[styles.screen, { paddingBottom: 40 + insets.bottom }]}>
      <StatusBar variant="dark" />

      {/* Progress Bar (2/2) */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, styles.progressBarActive]} />
        <View style={[styles.progressBar, styles.progressBarActive]} />
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
            <Text style={styles.fieldLabel}>משקולות (lb)</Text>
            <Input
              value={weights}
              onChangeText={setWeights}
              placeholder="0"
              keyboardType="numeric"
              textAlign="right"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>מידת סנפירים</Text>
            <Input
              value={finSize}
              onChangeText={setFinSize}
              placeholder="0"
              keyboardType="numeric"
              textAlign="right"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>מידת חליפת צלילה</Text>
            <Input
              value={suitSize}
              onChangeText={setSuitSize}
              placeholder="M"
              textAlign="right"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>תמונת פרופיל</Text>
            <TouchableOpacity
              style={styles.photoUploadArea}
              onPress={handlePhotoUpload}
              activeOpacity={0.7}
            >
              {profilePhoto ? (
                <Image source={{ uri: profilePhoto }} style={styles.uploadedPhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Svg width="53" height="41" viewBox="0 0 53 41" fill="none">
                    <Path
                      d="M48.65 40.5H4C1.79086 40.5 0 38.7091 0 36.5V4C0 1.79086 1.79086 0 4 0H14C15.1046 0 16 0.89543 16 2V4H48.65C50.8591 4 52.65 5.79086 52.65 8V36.5C52.65 38.7091 50.8591 40.5 48.65 40.5Z"
                      fill="#F0F0F0"
                    />
                    <Circle
                      cx="26.325"
                      cy="22.25"
                      r="9.25"
                      stroke={colors.primaryDarkest}
                      strokeWidth="2"
                    />
                    <Path
                      d="M16 4V2C16 0.89543 15.1046 0 14 0H4C1.79086 0 0 1.79086 0 4V36.5C0 38.7091 1.79086 40.5 4 40.5H48.65C50.8591 40.5 52.65 38.7091 52.65 36.5V8C52.65 5.79086 50.8591 4 48.65 4H16Z"
                      stroke={colors.primaryDarkest}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.actionGroup}>
            <Button variant="primary" fullWidth onPress={handleContinue} style={styles.submitButton}>
              המשך
            </Button>

            <Text style={styles.skipText}>
              <Text style={styles.skipLink} onPress={handleContinue}>
                דלג
              </Text>
              , אעלה את זה מאוחר יותר
            </Text>
          </View>
        </View>
      </ScrollView>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="הפרופיל הוגדר בהצלחה"
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
    fontSize: typography.sizes.base,
    fontWeight: '400',
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
  photoUploadArea: {
    width: '100%',
    height: 199,
    backgroundColor: colors.white[100],
    borderWidth: 1,
    borderColor: 'rgba(1, 0, 37, 0.15)',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
  },
  actionGroup: {
    flexDirection: 'column',
    gap: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButton: {
    width: '100%',
  },
  skipText: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    fontWeight: '400',
    color: colors.primaryDarkest,
    textAlign: 'center',
    letterSpacing: 0.12,
  },
  skipLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
