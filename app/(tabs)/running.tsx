import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../../src/core/theme/useTheme';
import RunningScreen from '../../src/presentation/screens/running/RunningScreen';

export default function RunningTab() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <RunningScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
