import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from '../../src/core/theme/useTheme';
import SettingsScreen from '../../src/presentation/screens/settings/SettingsScreen';

export default function SettingsTab() {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <SettingsScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
