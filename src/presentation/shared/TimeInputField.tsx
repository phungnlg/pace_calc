import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../core/theme/useTheme';

export interface TimeInputFieldRef {
  setTime: (hours: number, minutes: number, seconds: number) => void;
  clear: () => void;
}

interface Props {
  label: string;
  showHours?: boolean;
  onChanged: (hours: number, minutes: number, seconds: number) => void;
}

export const TimeInputField = forwardRef<TimeInputFieldRef, Props>(
  ({ label, showHours = true, onChanged }, ref) => {
    const theme = useTheme();
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    const minutesRef = useRef<TextInput>(null);
    const secondsRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      setTime: (h: number, m: number, s: number) => {
        setHours(h > 0 ? String(h) : '');
        setMinutes(m > 0 ? String(m) : '');
        setSeconds(s > 0 ? String(s) : '');
      },
      clear: () => {
        setHours('');
        setMinutes('');
        setSeconds('');
      },
    }));

    const fireChanged = (h: string, m: string, s: string) => {
      onChanged(parseInt(h, 10) || 0, parseInt(m, 10) || 0, parseInt(s, 10) || 0);
    };

    const handleHoursChange = (value: string) => {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
      setHours(cleaned);
      if (cleaned.length === 2) minutesRef.current?.focus();
      fireChanged(cleaned, minutes, seconds);
    };

    const handleMinutesChange = (value: string) => {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
      const num = parseInt(cleaned, 10);
      if (cleaned.length > 0 && num > 59) return;
      setMinutes(cleaned);
      if (cleaned.length === 2) secondsRef.current?.focus();
      fireChanged(hours, cleaned, seconds);
    };

    const handleSecondsChange = (value: string) => {
      const cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
      const num = parseInt(cleaned, 10);
      if (cleaned.length > 0 && num > 59) return;
      setSeconds(cleaned);
      fireChanged(hours, minutes, cleaned);
    };

    const inputStyle = [
      styles.input,
      { borderColor: theme.border, color: theme.text, backgroundColor: theme.surface },
    ];

    return (
      <View>
        {label ? (
          <Text style={[styles.label, { color: theme.subtext }]}>{label}</Text>
        ) : null}
        <View style={styles.row}>
          {showHours && (
            <>
              <TextInput
                style={inputStyle}
                value={hours}
                onChangeText={handleHoursChange}
                keyboardType="number-pad"
                placeholder="HH"
                placeholderTextColor={theme.subtext}
                textAlign="center"
                maxLength={2}
              />
              <Text style={[styles.colon, { color: theme.text }]}>:</Text>
            </>
          )}
          <TextInput
            ref={minutesRef}
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
});
