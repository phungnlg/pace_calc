import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';

export interface PaceInputFieldRef {
  setPace: (minutes: number, seconds: number) => void;
  clear: () => void;
}

interface Props {
  label: string;
  suffix: string;
  onChanged: (minutes: number, seconds: number) => void;
}

export const PaceInputField = forwardRef<PaceInputFieldRef, Props>(
  ({ label, suffix, onChanged }, ref) => {
    const theme = useTheme();
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const secondsRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      setPace: (m: number, s: number) => {
        setMinutes(m > 0 ? String(m) : '');
        setSeconds(s > 0 ? String(s) : '');
      },
      clear: () => {
        setMinutes('');
        setSeconds('');
      },
    }));

    const fireChanged = (m: string, s: string) => {
      onChanged(parseInt(m, 10) || 0, parseInt(s, 10) || 0);
    };

    const handleMinutesChange = (value: string) => {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
      setMinutes(cleaned);
      if (cleaned.length === 2) secondsRef.current?.focus();
      fireChanged(cleaned, seconds);
    };

    const handleSecondsChange = (value: string) => {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
      const num = parseInt(cleaned, 10);
      if (cleaned.length > 0 && num > 59) return;
      setSeconds(cleaned);
      fireChanged(minutes, cleaned);
    };

    const inputStyle = [
      styles.input,
      { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface },
    ];

    return (
      <View>
        <Text style={[styles.label, { color: theme.subtext }]}>{label}</Text>
        <View style={styles.row}>
          <TextInput
            style={inputStyle}
            value={minutes}
            onChangeText={handleMinutesChange}
            keyboardType="number-pad"
            placeholder="MM"
            placeholderTextColor={theme.subtext}
            textAlign="center"
            maxLength={2}
          />
          <Text style={[styles.colon, { color: theme.text }]}>:</Text>
          <TextInput
            ref={secondsRef}
            style={inputStyle}
            value={seconds}
            onChangeText={handleSecondsChange}
            keyboardType="number-pad"
            placeholder="SS"
            placeholderTextColor={theme.subtext}
            textAlign="center"
            maxLength={2}
          />
          <Text style={[styles.suffix, { color: theme.subtext }]}>{suffix}</Text>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 36,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 14,
    paddingVertical: 4,
  },
  colon: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 2,
  },
  suffix: {
    fontSize: 12,
    marginLeft: 4,
  },
});
