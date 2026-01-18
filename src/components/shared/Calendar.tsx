import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '@/constants/design-system';

interface CalendarProps {
  selectedDay?: number;
  highlightedDay?: number;
  month?: string;
  year?: string;
  onDayPress?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export default function Calendar({
  selectedDay,
  highlightedDay,
  month = 'Sep',
  year = '2022',
  onDayPress,
  onPrevMonth,
  onNextMonth,
}: CalendarProps) {
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <View style={styles.calendar}>
      <View style={styles.calendarHeader}>
        <Text style={styles.monthYear}>{month} {year}</Text>
        <View style={styles.calendarNav}>
          <TouchableOpacity onPress={onPrevMonth} activeOpacity={0.7}>
            <Text style={styles.navArrow}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNextMonth} activeOpacity={0.7}>
            <Text style={styles.navArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.weekDays}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((day) => (
          <View key={day} style={styles.dayWrapper}>
            <TouchableOpacity
              style={[
                styles.day,
                selectedDay === day && styles.daySelected,
                highlightedDay === day && styles.dayHighlight,
              ]}
              onPress={() => onDayPress?.(day)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === day && styles.dayTextSelected,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    backgroundColor: colors.white[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    flexDirection: 'column',
    gap: spacing.md,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthYear: {
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.sm,
    color: colors.primaryDarkest,
  },
  calendarNav: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  navArrow: {
    color: colors.lightBlue[100],
    fontSize: typography.sizes.lg,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontFamily: typography.fontFamilies.main,
    fontSize: typography.sizes.xs,
    color: colors.lightBlue[100],
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 280, // 7 columns * 40px
  },
  dayWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
  daySelected: {
    backgroundColor: colors.lightBlue[100],
  },
  dayHighlight: {
    backgroundColor: 'rgba(62, 157, 234, 0.3)',
  },
  dayText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: typography.sizes.xs,
    color: colors.primaryDarkest,
  },
  dayTextSelected: {
    color: colors.white[100],
  },
});
