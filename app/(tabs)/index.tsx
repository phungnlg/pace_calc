import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../../src/core/theme/useTheme';
import TriathlonScreen from '../../src/presentation/screens/triathlon/TriathlonScreen';

export default function TriathlonTab() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <TriathlonScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
