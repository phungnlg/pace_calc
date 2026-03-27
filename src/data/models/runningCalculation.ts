export interface RunningCalculation {
  id: string;
  distanceType: string;
  totalSeconds: number;
  paceSeconds: number;
  isMetric: boolean;
  createdAt: string; // ISO date string
}
