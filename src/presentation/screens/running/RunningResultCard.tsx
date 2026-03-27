import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../../shared/Card';
import { PaceFormatter } from '../../../domain/services/paceFormatter';
import { useTheme } from '../../../core/theme/useTheme';

interface Props {
  goalTimeSeconds: number;
  pacePerKmSeconds: number;
  pacePerMiSeconds: number;
  isMetric: boolean;
  distanceLabel: string;
}

export function RunningResultCard({
  goalTimeSeconds,
  pacePerKmSeconds,
  pacePerMiSeconds,
  distanceLabel,
}: Props) {
  const theme = useTheme();

  if (goalTimeSeconds <= 0 && pacePerKmSeconds <= 0) return null;

  return (
    <Card color={theme.primaryContainer}>
      <Text style={[styles.distanceLabel, { color: theme.onPrimaryContainer }]}>
        {distanceLabel}
      </Text>
      {goalTimeSeconds > 0 && (
        <>
          <Text style={[styles.subLabel, { color: theme.onPrimaryContainer + 'B3' }]}>
            Goal Time
          </Text>
          <Text style={[styles.totalTime, { color: theme.onPrimaryContainer }]}>
            {PaceFormatter.formatDuration(goalTimeSeconds)}
          </Text>
        </>
      )}
      {pacePerKmSeconds > 0 && (
        <>
          <View style={[styles.divider, { backgroundColor: theme.onPrimaryContainer + '30' }]} />
          <View style={styles.paceRow}>
            <View style={styles.paceCol}>
              <Text style={[styles.paceLabel, { color: theme.onPrimaryContainer + 'B3' }]}>
                Pace /km
              </Text>
              <Text style={[styles.paceValue, { color: theme.onPrimaryContainer }]}>
                {PaceFormatter.formatPace(pacePerKmSeconds)}
              </Text>
            </View>
            <View style={styles.paceCol}>
              <Text style={[styles.paceLabel, { color: theme.onPrimaryContainer + 'B3' }]}>
                Pace /mi
              </Text>
              <Text style={[styles.paceValue, { color: theme.onPrimaryContainer }]}>
                {PaceFormatter.formatPace(pacePerMiSeconds)}
              </Text>
            </View>
          </View>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  distanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
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
  paceRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  paceCol: {
    alignItems: 'center',
  },
  paceLabel: {
    fontSize: 12,
  },
  paceValue: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 4,
  },
});
