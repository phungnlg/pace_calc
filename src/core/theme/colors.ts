export const AppColors = {
  primary: '#0077B6',
  primaryLight: '#00B4D8',
  primaryDark: '#023E8A',

  accent: '#00C9A7',
  success: '#4CAF50',
  warning: '#FFB74D',
  error: '#EF5350',

  swimBlue: '#0077B6',
  bikeGreen: '#2E7D32',
  runOrange: '#E65100',
  transitionGrey: '#78909C',

  lightBg: '#F5F7FA',
  lightSurface: '#FFFFFF',
  lightText: '#1A1A2E',
  lightSubtext: '#6B7280',

  darkBg: '#0F1624',
  darkSurface: '#1A2332',
  darkText: '#F5F7FA',
  darkSubtext: '#9CA3AF',
};

export interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  subtext: string;
  primary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  border: string;
  card: string;
}

export const lightTheme: ThemeColors = {
  bg: AppColors.lightBg,
  surface: AppColors.lightSurface,
  text: AppColors.lightText,
  subtext: AppColors.lightSubtext,
  primary: AppColors.primary,
  primaryContainer: '#D4ECFA',
  onPrimaryContainer: '#023E8A',
  border: '#E5E7EB',
  card: AppColors.lightSurface,
};

export const darkTheme: ThemeColors = {
  bg: AppColors.darkBg,
  surface: AppColors.darkSurface,
  text: AppColors.darkText,
  subtext: AppColors.darkSubtext,
  primary: AppColors.primaryLight,
  primaryContainer: '#0A3A5C',
  onPrimaryContainer: '#D4ECFA',
  border: '#2D3748',
  card: AppColors.darkSurface,
};
