import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../shared/Card';
import { SplitTime } from '../../../data/models/splitTime';
import { PaceFormatter } from '../../../domain/services/paceFormatter';
import { AppColors } from '../../../core/theme/colors';
import { useTheme } from '../../../core/theme/useTheme';

interface Props {
  totalSeconds: number;
  splits: SplitTime[];
}

function colorForDiscipline(discipline: string): string {
  switch (discipline) {
    case 'Swim':
      return AppColors.swimBlue;
    case 'Bike':
      return AppColors.bikeGreen;
    case 'Run':
      return AppColors.runOrange;
    default:
      return AppColors.transitionGrey;
  }
}

export function TriResultCard({ totalSeconds, splits }: Props) {
  const theme = useTheme();

  if (totalSeconds <= 0) return null;

  return (
    <Card color={theme.primaryContainer}>
      <Text style={[styles.label, { color: theme.onPrimaryContainer }]}>
        Total Time
      </Text>
      <Text style={[styles.totalTime, { color: theme.onPrimaryContainer }]}>
        {PaceFormatter.formatDuration(totalSeconds)}
      </Text>
      <View style={[styles.divider, { backgroundColor: theme.onPrimaryContainer + '30' }]} />
      {splits.map((split, index) => {
        const color = colorForDiscipline(split.discipline);
        return (
          <View key={index} style={styles.splitRow}>
            <View style={[styles.splitDot, { backgroundColor: color }]} />
            <Text style={[styles.splitName, { color }]}>{split.discipline}</Text>
            <View style={styles.spacer} />
            <Text style={[styles.splitTime, { color: theme.onPrimaryContainer }]}>
              {PaceFormatter.formatDuration(split.totalSeconds)}
            </Text>
            {(split.paceDisplay || split.speedDisplay) && (
              <Text style={[styles.splitPace, { color: theme.onPrimaryContainer + 'B3' }]}>
                {'  '}{split.paceDisplay ?? split.speedDisplay}
              </Text>
            )}
          </View>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  totalTime: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  splitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  splitName: {
    fontSize: 14,
    fontWeight: '600',
    width: 50,
  },
  spacer: {
    flex: 1,
  },
  splitTime: {
    fontSize: 14,
    fontWeight: '600',
  },
  splitPace: {
    fontSize: 12,
    marginLeft: 8,
  },
});
