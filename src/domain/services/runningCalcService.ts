import { miToKm } from '../../core/constants/unitConversions';

export const RunningCalcService = {
  /** From goal time, calculate pace per km (in seconds) */
  paceFromGoalTime(goalTimeSeconds: number, distanceKm: number): number {
    if (distanceKm === 0) return 0;
    return goalTimeSeconds / distanceKm;
  },

  /** From pace per km, calculate goal time */
  goalTimeFromPace(pacePerKmSeconds: number, distanceKm: number): number {
    return pacePerKmSeconds * distanceKm;
  },

  /** Convert pace/km to pace/mi */
  pacePerKmToPerMi(pacePerKmSeconds: number): number {
    return pacePerKmSeconds * miToKm;
  },

  /** Convert pace/mi to pace/km */
  pacePerMiToPerKm(pacePerMiSeconds: number): number {
    return pacePerMiSeconds / miToKm;
  },
};
