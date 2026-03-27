import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';
import { AppColors } from '../../core/theme/colors';

interface Props {
  isMetric: boolean;
  onChanged: (value: boolean) => void;
}

export function UnitToggle({ isMetric, onChanged }: Props) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <TouchableOpacity
        style={[styles.segment, isMetric && styles.segmentActive]}
        onPress={() => onChanged(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.segmentText,
            { color: isMetric ? '#fff' : theme.subtext },
          ]}
        >
          Metric
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segment, !isMetric && styles.segmentActive]}
        onPress={() => onChanged(false)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.segmentText,
            { color: !isMetric ? '#fff' : theme.subtext },
          ]}
        >
          Imperial
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: AppColors.primary,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
