import { TriDistanceType } from '../../core/constants/raceDistances';
import { kmToMi, miToKm } from '../../core/constants/unitConversions';
import { SplitTime } from '../../data/models/splitTime';
import { PaceFormatter } from './paceFormatter';

export interface TriathlonCalcResult {
  totalSeconds: number;
  splits: SplitTime[];
}

export const TriathlonCalcService = {
  /** Swim: pace is per 100m, returns total seconds */
  swimTimeFromPace(pacePer100mSeconds: number, distanceMeters: number): number {
    return (pacePer100mSeconds * distanceMeters) / 100;
  },

  /** Swim: from total time, returns pace per 100m in seconds */
  swimPaceFromTime(totalSeconds: number, distanceMeters: number): number {
    if (distanceMeters === 0) return 0;
    return (totalSeconds * 100) / distanceMeters;
  },

  /** Bike: speed in km/h, returns total seconds */
  bikeTimeFromSpeed(speedKmh: number, distanceKm: number): number {
    if (speedKmh === 0) return 0;
    return (distanceKm / speedKmh) * 3600;
  },

  /** Bike: from total time, returns speed in km/h */
  bikeSpeedFromTime(totalSeconds: number, distanceKm: number): number {
    if (totalSeconds === 0) return 0;
    return distanceKm / (totalSeconds / 3600);
  },

  /** Run: pace per km in seconds, returns total seconds */
  runTimeFromPace(pacePerKmSeconds: number, distanceKm: number): number {
    return pacePerKmSeconds * distanceKm;
  },

  /** Run: from total time, returns pace per km in seconds */
  runPaceFromTime(totalSeconds: number, distanceKm: number): number {
    if (distanceKm === 0) return 0;
    return totalSeconds / distanceKm;
  },

  /** Convert pace/km to pace/mi */
  pacePerKmToPerMi(pacePerKmSeconds: number): number {
    return pacePerKmSeconds * miToKm;
  },

  /** Calculate full triathlon with all splits */
  calculateTotal(params: {
    distance: TriDistanceType;
    swimSeconds: number;
    bikeSeconds: number;
    runSeconds: number;
    t1Seconds?: number;
    t2Seconds?: number;
    isMetric?: boolean;
  }): TriathlonCalcResult {
    const {
      distance,
      swimSeconds,
      bikeSeconds,
      runSeconds,
      t1Seconds = 0,
      t2Seconds = 0,
      isMetric = true,
    } = params;

    const total = swimSeconds + t1Seconds + bikeSeconds + t2Seconds + runSeconds;

    const swimPace = this.swimPaceFromTime(swimSeconds, distance.swimMeters);
    const bikeSpeed = this.bikeSpeedFromTime(bikeSeconds, distance.bikeKm);
    const runPace = this.runPaceFromTime(runSeconds, distance.runKm);

    const splits: SplitTime[] = [
      {
        discipline: 'Swim',
        totalSeconds: swimSeconds,
        paceDisplay: `${PaceFormatter.formatPace(swimPace)} /100m`,
        distanceKm: distance.swimMeters / 1000,
      },
    ];

    if (t1Seconds > 0) {
      splits.push({
        discipline: 'T1',
        totalSeconds: t1Seconds,
      });
    }

    splits.push({
      discipline: 'Bike',
      totalSeconds: bikeSeconds,
      speedDisplay: isMetric
        ? PaceFormatter.formatSpeed(bikeSpeed)
        : PaceFormatter.formatSpeedMph(bikeSpeed * kmToMi),
      distanceKm: distance.bikeKm,
    });

    if (t2Seconds > 0) {
      splits.push({
        discipline: 'T2',
        totalSeconds: t2Seconds,
      });
    }

    const runPaceDisplay = isMetric
      ? `${PaceFormatter.formatPace(runPace)} /km`
      : `${PaceFormatter.formatPace(this.pacePerKmToPerMi(runPace))} /mi`;

    splits.push({
      discipline: 'Run',
      totalSeconds: runSeconds,
      paceDisplay: runPaceDisplay,
      distanceKm: distance.runKm,
    });

    return { totalSeconds: total, splits };
  },
};
