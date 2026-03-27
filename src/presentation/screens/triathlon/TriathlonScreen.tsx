import React, { useState, useRef, useCallback } from 'react';
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
import { AppColors } from '../../../core/theme/colors';
import {
  TriDistance,
  triDistanceValues,
  TriDistanceType,
} from '../../../core/constants/raceDistances';
import { TriathlonCalcService } from '../../../domain/services/triathlonCalcService';
import { HapticService } from '../../../core/services/hapticService';
import { SplitTime } from '../../../data/models/splitTime';
import { ChipSelector } from '../../shared/ChipSelector';
import { UnitToggle } from '../../shared/UnitToggle';
import { TimeInputField, TimeInputFieldRef } from '../../shared/TimeInputField';
import { PaceInputFieldRef } from '../../shared/PaceInputField';
import { DisciplineInputCard } from './DisciplineInputCard';
import { TriResultCard } from './TriResultCard';

export default function TriathlonScreen() {
  const theme = useTheme();
  const isMetric = useAppStore((s) => s.isMetric);
  const setMetric = useAppStore((s) => s.setMetric);
  const saveTriCalc = useAppStore((s) => s.saveTriCalc);

  const [selectedDistance, setSelectedDistance] = useState<TriDistanceType>(
    TriDistance.olympic
  );

  const swimTimeRef = useRef<TimeInputFieldRef>(null);
  const swimPaceRef = useRef<PaceInputFieldRef>(null);
  const bikeTimeRef = useRef<TimeInputFieldRef>(null);
  const runTimeRef = useRef<TimeInputFieldRef>(null);
  const runPaceRef = useRef<PaceInputFieldRef>(null);
  const t1TimeRef = useRef<TimeInputFieldRef>(null);
  const t2TimeRef = useRef<TimeInputFieldRef>(null);

  const [swimSeconds, setSwimSeconds] = useState(0);
  const [bikeSeconds, setBikeSeconds] = useState(0);
  const [runSeconds, setRunSeconds] = useState(0);
  const [t1Seconds, setT1Seconds] = useState(0);
  const [t2Seconds, setT2Seconds] = useState(0);
  const [bikeSpeed, setBikeSpeed] = useState('');

  const [totalSeconds, setTotalSeconds] = useState(0);
  const [splits, setSplits] = useState<SplitTime[]>([]);

  const calculate = useCallback(
    (
      dist: TriDistanceType,
      swim: number,
      bike: number,
      run: number,
      t1: number,
      t2: number,
      metric: boolean
    ) => {
      const result = TriathlonCalcService.calculateTotal({
        distance: dist,
        swimSeconds: swim,
        bikeSeconds: bike,
        runSeconds: run,
        t1Seconds: t1,
        t2Seconds: t2,
        isMetric: metric,
      });
      setTotalSeconds(result.totalSeconds);
      setSplits(result.splits);
    },
    []
  );

  const onSwimTimeChanged = (h: number, m: number, s: number) => {
    const secs = h * 3600 + m * 60 + s;
    setSwimSeconds(secs);
    if (secs > 0) {
      const pace = TriathlonCalcService.swimPaceFromTime(
        secs,
        selectedDistance.swimMeters
      );
      const pm = Math.floor(Math.round(pace) / 60);
      const ps = Math.round(pace) % 60;
      swimPaceRef.current?.setPace(pm, ps);
    }
    calculate(selectedDistance, secs, bikeSeconds, runSeconds, t1Seconds, t2Seconds, isMetric);
  };

  const onSwimPaceChanged = (m: number, s: number) => {
    const paceSeconds = m * 60 + s;
    if (paceSeconds > 0) {
      const secs = TriathlonCalcService.swimTimeFromPace(
        paceSeconds,
        selectedDistance.swimMeters
      );
      setSwimSeconds(secs);
      const h = Math.floor(Math.round(secs) / 3600);
      const min = Math.floor((Math.round(secs) % 3600) / 60);
      const sec = Math.round(secs) % 60;
      swimTimeRef.current?.setTime(h, min, sec);
      calculate(selectedDistance, secs, bikeSeconds, runSeconds, t1Seconds, t2Seconds, isMetric);
    }
  };

  const onBikeTimeChanged = (h: number, m: number, s: number) => {
    const secs = h * 3600 + m * 60 + s;
    setBikeSeconds(secs);
    if (secs > 0) {
      const speed = TriathlonCalcService.bikeSpeedFromTime(secs, selectedDistance.bikeKm);
      setBikeSpeed(speed.toFixed(1));
    }
    calculate(selectedDistance, swimSeconds, secs, runSeconds, t1Seconds, t2Seconds, isMetric);
  };

  const onBikeSpeedChanged = (value: string) => {
    setBikeSpeed(value);
    const speed = parseFloat(value);
    if (!isNaN(speed) && speed > 0) {
      const secs = TriathlonCalcService.bikeTimeFromSpeed(speed, selectedDistance.bikeKm);
      setBikeSeconds(secs);
      const h = Math.floor(Math.round(secs) / 3600);
      const m = Math.floor((Math.round(secs) % 3600) / 60);
      const s = Math.round(secs) % 60;
      bikeTimeRef.current?.setTime(h, m, s);
      calculate(selectedDistance, swimSeconds, secs, runSeconds, t1Seconds, t2Seconds, isMetric);
    }
  };

  const onRunTimeChanged = (h: number, m: number, s: number) => {
    const secs = h * 3600 + m * 60 + s;
    setRunSeconds(secs);
    if (secs > 0) {
      const pace = TriathlonCalcService.runPaceFromTime(secs, selectedDistance.runKm);
      const pm = Math.floor(Math.round(pace) / 60);
      const ps = Math.round(pace) % 60;
      runPaceRef.current?.setPace(pm, ps);
    }
    calculate(selectedDistance, swimSeconds, bikeSeconds, secs, t1Seconds, t2Seconds, isMetric);
  };

  const onRunPaceChanged = (m: number, s: number) => {
    const paceSeconds = m * 60 + s;
    if (paceSeconds > 0) {
      const secs = TriathlonCalcService.runTimeFromPace(paceSeconds, selectedDistance.runKm);
      setRunSeconds(secs);
      const h = Math.floor(Math.round(secs) / 3600);
      const min = Math.floor((Math.round(secs) % 3600) / 60);
      const sec = Math.round(secs) % 60;
      runTimeRef.current?.setTime(h, min, sec);
      calculate(selectedDistance, swimSeconds, bikeSeconds, secs, t1Seconds, t2Seconds, isMetric);
    }
  };

  const onT1Changed = (_h: number, m: number, s: number) => {
    const secs = m * 60 + s;
    setT1Seconds(secs);
    calculate(selectedDistance, swimSeconds, bikeSeconds, runSeconds, secs, t2Seconds, isMetric);
  };

  const onT2Changed = (_h: number, m: number, s: number) => {
    const secs = m * 60 + s;
    setT2Seconds(secs);
    calculate(selectedDistance, swimSeconds, bikeSeconds, runSeconds, t1Seconds, secs, isMetric);
  };

  const handleSave = async () => {
    if (totalSeconds <= 0) return;
    HapticService.success();
    await saveTriCalc({
      id: uuidv4(),
      raceType: selectedDistance.label,
      totalSeconds,
      splits,
      createdAt: new Date().toISOString(),
    });
    Alert.alert('Saved', 'Calculation saved to history');
  };

  const handleClear = () => {
    swimTimeRef.current?.clear();
    swimPaceRef.current?.clear();
    bikeTimeRef.current?.clear();
    runTimeRef.current?.clear();
    runPaceRef.current?.clear();
    t1TimeRef.current?.clear();
    t2TimeRef.current?.clear();
    setSwimSeconds(0);
    setBikeSeconds(0);
    setRunSeconds(0);
    setT1Seconds(0);
    setT2Seconds(0);
    setBikeSpeed('');
    setTotalSeconds(0);
    setSplits([]);
  };

  const handleDistanceChange = (key: string) => {
    const dist = triDistanceValues.find((d) => d.key === key) ?? TriDistance.olympic;
    setSelectedDistance(dist);
    calculate(dist, swimSeconds, bikeSeconds, runSeconds, t1Seconds, t2Seconds, isMetric);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Triathlon Calculator</Text>
        <View style={styles.headerActions}>
          {totalSeconds > 0 && (
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
          items={triDistanceValues.map((d) => ({ key: d.key, label: d.label }))}
          selectedKey={selectedDistance.key}
          onSelected={handleDistanceChange}
        />
        <View style={styles.spacerSm} />
        <UnitToggle
          isMetric={isMetric}
          onChanged={(v) => {
            setMetric(v);
            calculate(selectedDistance, swimSeconds, bikeSeconds, runSeconds, t1Seconds, t2Seconds, v);
          }}
        />
        <View style={styles.spacerMd} />

        {/* Swim */}
        <DisciplineInputCard
          title={`Swim (${Math.round(selectedDistance.swimMeters)}m)`}
          color={AppColors.swimBlue}
          timeRef={swimTimeRef}
          paceRef={swimPaceRef}
          paceLabel="Pace"
          paceSuffix="/100m"
          onTimeChanged={onSwimTimeChanged}
          onPaceChanged={onSwimPaceChanged}
        />
        <View style={styles.spacerSm} />

        {/* T1 */}
        <View
          style={[styles.transitionCard, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <View style={[styles.transitionDot, { backgroundColor: AppColors.transitionGrey }]} />
          <Text style={[styles.transitionLabel, { color: AppColors.transitionGrey }]}>T1</Text>
          <View style={styles.transitionInput}>
            <TimeInputField ref={t1TimeRef} label="" showHours={false} onChanged={onT1Changed} />
          </View>
        </View>
        <View style={styles.spacerSm} />

        {/* Bike */}
        <DisciplineInputCard
          title={`Bike (${selectedDistance.bikeKm}km)`}
          color={AppColors.bikeGreen}
          timeRef={bikeTimeRef}
          showPace={false}
          onTimeChanged={onBikeTimeChanged}
          speedLabel="Speed"
          speedValue={bikeSpeed}
          speedSuffix={isMetric ? 'km/h' : 'mph'}
          onSpeedChanged={onBikeSpeedChanged}
        />
        <View style={styles.spacerSm} />

        {/* T2 */}
        <View
          style={[styles.transitionCard, { backgroundColor: theme.card, borderColor: theme.border }]}
        >
          <View style={[styles.transitionDot, { backgroundColor: AppColors.transitionGrey }]} />
          <Text style={[styles.transitionLabel, { color: AppColors.transitionGrey }]}>T2</Text>
          <View style={styles.transitionInput}>
            <TimeInputField ref={t2TimeRef} label="" showHours={false} onChanged={onT2Changed} />
          </View>
        </View>
        <View style={styles.spacerSm} />

        {/* Run */}
        <DisciplineInputCard
          title={`Run (${selectedDistance.runKm}km)`}
          color={AppColors.runOrange}
          timeRef={runTimeRef}
          paceRef={runPaceRef}
          paceLabel="Pace"
          paceSuffix={isMetric ? '/km' : '/mi'}
          onTimeChanged={onRunTimeChanged}
          onPaceChanged={onRunPaceChanged}
        />
        <View style={styles.spacerMd} />

        {/* Results */}
        <TriResultCard totalSeconds={totalSeconds} splits={splits} />
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
  transitionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  transitionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  transitionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 16,
  },
  transitionInput: {
    flex: 1,
  },
});
