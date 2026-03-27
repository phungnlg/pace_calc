import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card } from '../../shared/Card';
import { TimeInputField, TimeInputFieldRef } from '../../shared/TimeInputField';
import { PaceInputField, PaceInputFieldRef } from '../../shared/PaceInputField';
import { useTheme } from '../../../core/theme/useTheme';

interface Props {
  title: string;
  color: string;
  timeRef: React.RefObject<TimeInputFieldRef | null>;
  paceRef?: React.RefObject<PaceInputFieldRef | null>;
  paceLabel?: string;
  paceSuffix?: string;
  showPace?: boolean;
  onTimeChanged: (h: number, m: number, s: number) => void;
  onPaceChanged?: (m: number, s: number) => void;
  showHours?: boolean;
  speedLabel?: string;
  speedValue?: string;
  speedSuffix?: string;
  onSpeedChanged?: (value: string) => void;
}

export function DisciplineInputCard({
  title,
  color,
  timeRef,
  paceRef,
  paceLabel,
  paceSuffix,
  showPace = true,
  onTimeChanged,
  onPaceChanged,
  showHours = true,
  speedLabel,
  speedValue,
  speedSuffix,
  onSpeedChanged,
}: Props) {
  const theme = useTheme();

  return (
    <Card>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={[styles.title, { color }]}>{title}</Text>
      </View>
      <View style={styles.inputRow}>
        <TimeInputField
          ref={timeRef}
          label="Time"
          showHours={showHours}
          onChanged={onTimeChanged}
        />
        {showPace && paceRef && onPaceChanged && (
          <View style={styles.paceContainer}>
            <PaceInputField
              ref={paceRef}
              label={paceLabel ?? 'Pace'}
              suffix={paceSuffix ?? '/km'}
              onChanged={onPaceChanged}
            />
          </View>
        )}
        {onSpeedChanged && (
          <View style={styles.speedContainer}>
            <Text style={[styles.speedLabel, { color: theme.subtext }]}>
              {speedLabel ?? 'Speed'}
            </Text>
            <View style={styles.speedInputRow}>
              <TextInput
                style={[
                  styles.speedInput,
                  {
                    borderColor: theme.border,
                    color: theme.text,
                    backgroundColor: theme.surface,
                  },
                ]}
                value={speedValue}
                onChangeText={onSpeedChanged}
                keyboardType="decimal-pad"
                placeholder="0.0"
                placeholderTextColor={theme.subtext}
                textAlign="center"
              />
              <Text style={[styles.speedSuffix, { color: theme.subtext }]}>
                {speedSuffix ?? 'km/h'}
              </Text>
            </View>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  paceContainer: {
    marginLeft: 12,
  },
  speedContainer: {
    marginLeft: 16,
  },
  speedLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  speedInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speedInput: {
    width: 60,
    height: 36,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  speedSuffix: {
    fontSize: 12,
    marginLeft: 4,
  },
});
