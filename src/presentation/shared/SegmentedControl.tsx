import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';
import { AppColors } from '../../core/theme/colors';

interface Segment<T> {
  value: T;
  label: string;
}

interface Props<T> {
  segments: Segment<T>[];
  selected: T;
  onChanged: (value: T) => void;
}

export function SegmentedControl<T>({ segments, selected, onChanged }: Props<T>) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      {segments.map((seg, index) => {
        const isSelected = seg.value === selected;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.segment, isSelected && styles.segmentActive]}
            onPress={() => onChanged(seg.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                { color: isSelected ? '#fff' : theme.subtext },
              ]}
            >
              {seg.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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
    paddingVertical: 10,
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
