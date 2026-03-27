import { SplitTime } from './splitTime';

export interface TriathlonCalculation {
  id: string;
  raceType: string;
  totalSeconds: number;
  splits: SplitTime[];
  createdAt: string; // ISO date string
}
