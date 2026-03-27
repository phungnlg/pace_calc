import { create } from 'zustand';
import { TriathlonCalculation } from '../data/models/triathlonCalculation';
import { RunningCalculation } from '../data/models/runningCalculation';
import { CalculationRepository } from '../data/repositories/calculationRepository';

interface AppState {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Units
  isMetric: boolean;
  setMetric: (value: boolean) => void;
  toggleMetric: () => void;

  // Triathlon history
  triHistory: TriathlonCalculation[];
  loadTriHistory: () => Promise<void>;
  saveTriCalc: (calc: TriathlonCalculation) => Promise<void>;
  deleteTriCalc: (id: string) => Promise<void>;
  clearAllTriCalcs: () => Promise<void>;

  // Running history
  runHistory: RunningCalculation[];
  loadRunHistory: () => Promise<void>;
  saveRunCalc: (calc: RunningCalculation) => Promise<void>;
  deleteRunCalc: (id: string) => Promise<void>;
  clearAllRunCalcs: () => Promise<void>;

  // Clear all
  clearAllHistory: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  // Theme
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),

  // Units
  isMetric: true,
  setMetric: (value: boolean) => set({ isMetric: value }),
  toggleMetric: () => set((state) => ({ isMetric: !state.isMetric })),

  // Triathlon history
  triHistory: [],
  loadTriHistory: async () => {
    const calcs = await CalculationRepository.getAllTriCalcs();
    set({ triHistory: calcs });
  },
  saveTriCalc: async (calc: TriathlonCalculation) => {
    await CalculationRepository.saveTriCalc(calc);
    const calcs = await CalculationRepository.getAllTriCalcs();
    set({ triHistory: calcs });
  },
  deleteTriCalc: async (id: string) => {
    await CalculationRepository.deleteTriCalc(id);
    const calcs = await CalculationRepository.getAllTriCalcs();
    set({ triHistory: calcs });
  },
  clearAllTriCalcs: async () => {
    await CalculationRepository.clearAllTriCalcs();
    set({ triHistory: [] });
  },

  // Running history
  runHistory: [],
  loadRunHistory: async () => {
    const calcs = await CalculationRepository.getAllRunCalcs();
    set({ runHistory: calcs });
  },
  saveRunCalc: async (calc: RunningCalculation) => {
    await CalculationRepository.saveRunCalc(calc);
    const calcs = await CalculationRepository.getAllRunCalcs();
    set({ runHistory: calcs });
  },
  deleteRunCalc: async (id: string) => {
    await CalculationRepository.deleteRunCalc(id);
    const calcs = await CalculationRepository.getAllRunCalcs();
    set({ runHistory: calcs });
  },
  clearAllRunCalcs: async () => {
    await CalculationRepository.clearAllRunCalcs();
    set({ runHistory: [] });
  },

  // Clear all
  clearAllHistory: async () => {
    await CalculationRepository.clearAll();
    set({ triHistory: [], runHistory: [] });
  },
}));
