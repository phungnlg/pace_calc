export interface TriDistanceType {
  key: string;
  label: string;
  swimMeters: number;
  bikeKm: number;
  runKm: number;
}

export const TriDistance: Record<string, TriDistanceType> = {
  sprint: { key: 'sprint', label: 'Sprint', swimMeters: 750, bikeKm: 20.0, runKm: 5.0 },
  olympic: { key: 'olympic', label: 'Olympic', swimMeters: 1500, bikeKm: 40.0, runKm: 10.0 },
  half: { key: 'half', label: '70.3', swimMeters: 1931, bikeKm: 90.12, runKm: 21.1 },
  full: { key: 'full', label: 'Full Distance', swimMeters: 3862, bikeKm: 180.25, runKm: 42.195 },
};

export const triDistanceValues: TriDistanceType[] = [
  TriDistance.sprint,
  TriDistance.olympic,
  TriDistance.half,
  TriDistance.full,
];

export interface RunDistanceType {
  key: string;
  label: string;
  km: number;
}

export const RunDistance: Record<string, RunDistanceType> = {
  fiveK: { key: 'fiveK', label: '5K', km: 5.0 },
  tenK: { key: 'tenK', label: '10K', km: 10.0 },
  halfMarathon: { key: 'halfMarathon', label: 'Half Marathon', km: 21.0975 },
  marathon: { key: 'marathon', label: 'Marathon', km: 42.195 },
};

export const runDistanceValues: RunDistanceType[] = [
  RunDistance.fiveK,
  RunDistance.tenK,
  RunDistance.halfMarathon,
  RunDistance.marathon,
];
