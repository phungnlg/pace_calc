import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../../src/core/theme/useTheme';
import HistoryScreen from '../../src/presentation/screens/history/HistoryScreen';

export default function HistoryTab() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <HistoryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
