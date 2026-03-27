import AsyncStorage from '@react-native-async-storage/async-storage';
import { TriathlonCalculation } from '../models/triathlonCalculation';
import { RunningCalculation } from '../models/runningCalculation';

const TRI_KEY = '@triathlon_calculations';
const RUN_KEY = '@running_calculations';

export const CalculationRepository = {
  // Triathlon
  async getAllTriCalcs(): Promise<TriathlonCalculation[]> {
    try {
      const json = await AsyncStorage.getItem(TRI_KEY);
      if (!json) return [];
      const calcs: TriathlonCalculation[] = JSON.parse(json);
      return calcs.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch {
      return [];
    }
  },

  async getTriCalc(id: string): Promise<TriathlonCalculation | null> {
    const calcs = await this.getAllTriCalcs();
    return calcs.find((c) => c.id === id) ?? null;
  },

  async saveTriCalc(calc: TriathlonCalculation): Promise<void> {
    const calcs = await this.getAllTriCalcs();
    const existing = calcs.findIndex((c) => c.id === calc.id);
    if (existing >= 0) {
      calcs[existing] = calc;
    } else {
      calcs.push(calc);
    }
    await AsyncStorage.setItem(TRI_KEY, JSON.stringify(calcs));
  },

  async deleteTriCalc(id: string): Promise<void> {
    const calcs = await this.getAllTriCalcs();
    const filtered = calcs.filter((c) => c.id !== id);
    await AsyncStorage.setItem(TRI_KEY, JSON.stringify(filtered));
  },

  async clearAllTriCalcs(): Promise<void> {
    await AsyncStorage.removeItem(TRI_KEY);
  },

  // Running
  async getAllRunCalcs(): Promise<RunningCalculation[]> {
    try {
      const json = await AsyncStorage.getItem(RUN_KEY);
      if (!json) return [];
      const calcs: RunningCalculation[] = JSON.parse(json);
      return calcs.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch {
      return [];
    }
  },

  async getRunCalc(id: string): Promise<RunningCalculation | null> {
    const calcs = await this.getAllRunCalcs();
    return calcs.find((c) => c.id === id) ?? null;
  },

  async saveRunCalc(calc: RunningCalculation): Promise<void> {
    const calcs = await this.getAllRunCalcs();
    const existing = calcs.findIndex((c) => c.id === calc.id);
    if (existing >= 0) {
      calcs[existing] = calc;
    } else {
      calcs.push(calc);
    }
    await AsyncStorage.setItem(RUN_KEY, JSON.stringify(calcs));
  },

  async deleteRunCalc(id: string): Promise<void> {
    const calcs = await this.getAllRunCalcs();
    const filtered = calcs.filter((c) => c.id !== id);
    await AsyncStorage.setItem(RUN_KEY, JSON.stringify(filtered));
  },

  async clearAllRunCalcs(): Promise<void> {
    await AsyncStorage.removeItem(RUN_KEY);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([TRI_KEY, RUN_KEY]);
  },
};
