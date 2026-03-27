import { useAppStore } from '../../store/useAppStore';
import { lightTheme, darkTheme, ThemeColors } from './colors';

export function useTheme(): ThemeColors {
  const isDark = useAppStore((s) => s.isDark);
  return isDark ? darkTheme : lightTheme;
}
