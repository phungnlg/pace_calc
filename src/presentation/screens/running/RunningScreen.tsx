import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../core/theme/useTheme';
import {
  RunDistance,
  runDistanceValues,
  RunDistanceType,
} from '../../../core/constants/raceDistances';
import { RunningCalcService } from '../../../domain/services/runningCalcService';
import { HapticService } from '../../../core/services/hapticService';
import { ChipSelector } from '../../shared/ChipSelector';
import { UnitToggle } from '../../shared/UnitToggle';
import { Card } from '../../shared/Card';
import { SegmentedControl } from '../../shared/SegmentedControl';
import { TimeInputField, TimeInputFieldRef } from '../../shared/TimeInputField';
import { PaceInputField, PaceInputFieldRef } from '../../shared/PaceInputField';
import { RunningResultCard } from './RunningResultCard';

type RunMode = 'timeToPace' | 'paceToTime';

export default function RunningScreen() {
  const theme = useTheme();
  const isMetric = useAppStore((s) => s.isMetric);
  const setMetric = useAppStore((s) => s.setMetric);
  const saveRunCalc = useAppStore((s) => s.saveRunCalc);

  const [selectedDistance, setSelectedDistance] = useState<RunDistanceType>(
    RunDistance.fiveK
  );
  const [mode, setMode] = useState<RunMode>('timeToPace');

  const goalTimeRef = useRef<TimeInputFieldRef>(null);
  const paceRef = useRef<PaceInputFieldRef>(null);

  const [goalTimeSeconds, setGoalTimeSeconds] = useState(0);
  const [pacePerKmSeconds, setPacePerKmSeconds] = useState(0);
  const [pacePerMiSeconds, setPacePerMiSeconds] = useState(0);

  const calculateFromTime = (
    h: number,
    m: number,
    s: number,
    dist: RunDistanceType = selectedDistance
  ) => {
    const totalSecs = h * 3600 + m * 60 + s;
    if (totalSecs <= 0) return;
    setGoalTimeSeconds(totalSecs);

    const paceKm = RunningCalcService.paceFromGoalTime(totalSecs, dist.km);
    const paceMi = RunningCalcService.pacePerKmToPerMi(paceKm);
    setPacePerKmSeconds(paceKm);
    setPacePerMiSeconds(paceMi);

    const pm = Math.floor(Math.round(paceKm) / 60);
    const ps = Math.round(paceKm) % 60;
    paceRef.current?.setPace(pm, ps);
  };

  const calculateFromPace = (
    m: number,
    s: number,
    dist: RunDistanceType = selectedDistance,
    metric: boolean = isMetric
  ) => {
    const inputPace = m * 60 + s;
    if (inputPace <= 0) return;

    let paceKm: number;
    let paceMi: number;

    if (metric) {
      paceKm = inputPace;
      paceMi = RunningCalcService.pacePerKmToPerMi(paceKm);
    } else {
      paceMi = inputPace;
      paceKm = RunningCalcService.pacePerMiToPerKm(paceMi);
    }

    setPacePerKmSeconds(paceKm);
    setPacePerMiSeconds(paceMi);

    const total = RunningCalcService.goalTimeFromPace(paceKm, dist.km);
    setGoalTimeSeconds(total);

    const h = Math.floor(Math.round(total) / 3600);
    const min = Math.floor((Math.round(total) % 3600) / 60);
    const sec = Math.round(total) % 60;
    goalTimeRef.current?.setTime(h, min, sec);
  };

  const handleDistanceChange = (key: string) => {
    const dist = runDistanceValues.find((d) => d.key === key) ?? RunDistance.fiveK;
    setSelectedDistance(dist);
    if (mode === 'timeToPace' && goalTimeSeconds > 0) {
      const h = Math.floor(Math.round(goalTimeSeconds) / 3600);
      const m = Math.floor((Math.round(goalTimeSeconds) % 3600) / 60);
      const s = Math.round(goalTimeSeconds) % 60;
      calculateFromTime(h, m, s, dist);
    } else if (mode === 'paceToTime' && pacePerKmSeconds > 0) {
      const pm = Math.floor(Math.round(pacePerKmSeconds) / 60);
      const ps = Math.round(pacePerKmSeconds) % 60;
      calculateFromPace(pm, ps, dist);
    }
  };

  const handleSave = async () => {
    if (goalTimeSeconds <= 0) return;
    HapticService.success();
    await saveRunCalc({
      id: uuidv4(),
      distanceType: selectedDistance.label,
      totalSeconds: goalTimeSeconds,
      paceSeconds: pacePerKmSeconds,
      isMetric,
      createdAt: new Date().toISOString(),
    });
    Alert.alert('Saved', 'Calculation saved to history');
  };

  const handleClear = () => {
    goalTimeRef.current?.clear();
    paceRef.current?.clear();
    setGoalTimeSeconds(0);
    setPacePerKmSeconds(0);
    setPacePerMiSeconds(0);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Running Calculator</Text>
        <View style={styles.headerActions}>
          {goalTimeSeconds > 0 && (
            <TouchableOpacity onPress={handleSave} style={styles.iconBtn}>
              <Text style={[styles.iconText, { color: theme.primary }]}>Save</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleClear} style={styles.iconBtn}>
            <Text style={[styles.iconText, { color: theme.subtext }]}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ChipSelector
          items={runDistanceValues.map((d) => ({ key: d.key, label: d.label }))}
          selectedKey={selectedDistance.key}
          onSelected={handleDistanceChange}
        />
        <View style={styles.spacerSm} />
        <UnitToggle
          isMetric={isMetric}
          onChanged={(v) => setMetric(v)}
        />
        <View style={styles.spacerMd} />

        <SegmentedControl<RunMode>
          segments={[
            { value: 'timeToPace', label: 'Time > Pace' },
            { value: 'paceToTime', label: 'Pace > Time' },
          ]}
          selected={mode}
          onChanged={(m) => {
            HapticService.selection();
            setMode(m);
          }}
        />
        <View style={styles.spacerMd} />

        <Card>
          {mode === 'timeToPace' ? (
            <TimeInputField
              ref={goalTimeRef}
              label="Goal Time"
              onChanged={(h, m, s) => calculateFromTime(h, m, s)}
            />
          ) : (
            <PaceInputField
              ref={paceRef}
              label="Target Pace"
              suffix={isMetric ? '/km' : '/mi'}
              onChanged={(m, s) => calculateFromPace(m, s)}
            />
          )}
        </Card>
        <View style={styles.spacerMd} />

        <RunningResultCard
          goalTimeSeconds={goalTimeSeconds}
          pacePerKmSeconds={pacePerKmSeconds}
          pacePerMiSeconds={pacePerMiSeconds}
          isMetric={isMetric}
          distanceLabel={selectedDistance.label}
        />
        <View style={styles.spacerLg} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  spacerSm: {
    height: 8,
  },
  spacerMd: {
    height: 16,
  },
  spacerLg: {
    height: 32,
  },
});
