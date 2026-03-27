import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { AppColors } from '../../../core/theme/colors';
import { PaceFormatter } from '../../../domain/services/paceFormatter';

interface Props {
  isTriathlon: boolean;
  distanceLabel: string;
  totalSeconds: number;
  createdAt: string;
  onPress: () => void;
  onDelete: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const mins = String(d.getMinutes()).padStart(2, '0');
  return `${month} ${day}, ${year} - ${hours}:${mins}`;
}

export function HistoryItemCard({
  isTriathlon,
  distanceLabel,
  totalSeconds,
  createdAt,
  onPress,
  onDelete,
}: Props) {
  const theme = useTheme();
  const iconColor = isTriathlon ? AppColors.swimBlue : AppColors.runOrange;
  const iconBg = isTriathlon
    ? AppColors.swimBlue + '26'
    : AppColors.runOrange + '26';

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onDelete}
      activeOpacity={0.7}
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
        <Text style={[styles.iconEmoji, { color: iconColor }]}>
          {isTriathlon ? '\u{1F3CA}' : '\u{1F3C3}'}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isTriathlon ? 'Triathlon' : 'Running'} - {distanceLabel}
        </Text>
        <Text style={[styles.date, { color: theme.subtext }]}>
          {formatDate(createdAt)}
        </Text>
      </View>
      <Text style={[styles.time, { color: theme.text }]}>
        {PaceFormatter.formatDuration(totalSeconds)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    marginTop: 2,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
});
