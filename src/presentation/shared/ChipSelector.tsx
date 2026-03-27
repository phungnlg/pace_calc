import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';
import { AppColors } from '../../core/theme/colors';
import { HapticService } from '../../core/services/hapticService';

interface ChipItem {
  label: string;
  key: string;
}

interface Props {
  items: ChipItem[];
  selectedKey: string;
  onSelected: (key: string) => void;
}

export function ChipSelector({ items, selectedKey, onSelected }: Props) {
  const theme = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {items.map((item) => {
        const isSelected = item.key === selectedKey;
        return (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? AppColors.primary : theme.surface,
                borderColor: isSelected ? AppColors.primary : theme.border,
              },
            ]}
            onPress={() => {
              HapticService.selection();
              onSelected(item.key);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                { color: isSelected ? '#fff' : theme.text },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
