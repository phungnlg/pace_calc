# Pace Calculator - React Native/Expo

A running and triathlon pace calculator built with React Native and Expo. Calculate pace, time, and speed for running races and triathlon events.

## Features

- **Running Pace Calculator** - Calculate pace from time or time from pace for 5K, 10K, Half Marathon, and Marathon distances
- **Triathlon Calculator** - Full swim/bike/run calculator with T1/T2 transitions for Sprint, Olympic, 70.3, and Full Distance events
- **Unit Conversion** - Toggle between metric (km, m, km/h) and imperial (mi, yd, mph)
- **Calculation History** - Save and review past calculations with AsyncStorage persistence
- **Dark Mode** - Light and dark theme support
- **Haptic Feedback** - Tactile feedback on interactions

## Tech Stack

- React Native with Expo SDK 55
- TypeScript
- Expo Router (file-based tab navigation)
- Zustand (state management)
- AsyncStorage (local persistence)
- Expo Haptics

## Architecture

Clean architecture with separation of concerns:

```
src/
  core/           # Constants, theme, services
  data/           # Models, repositories
  domain/         # Business logic services
  presentation/   # UI components and screens
  store/          # Zustand state management
app/              # Expo Router pages
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android
```

## Converted From

Originally built with Flutter (Dart), using Riverpod, GoRouter, Freezed, and Hive. Converted to React Native/Expo with equivalent TypeScript implementations.
