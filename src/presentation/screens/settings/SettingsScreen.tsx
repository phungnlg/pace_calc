import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../core/theme/useTheme';
import { AppColors } from '../../../core/theme/colors';

export default function SettingsScreen() {
  const theme = useTheme();
  const isDark = useAppStore((s) => s.isDark);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const isMetric = useAppStore((s) => s.isMetric);
  const toggleMetric = useAppStore((s) => s.toggleMetric);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Preferences Section */}
        <Text style={[styles.sectionHeader, { color: theme.primary }]}>Preferences</Text>

        <View style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowIcon}>
            <Text style={styles.emoji}>{isDark ? '\u{1F31C}' : '\u{2600}\u{FE0F}'}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Dark Mode</Text>
            <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>
              {isDark ? 'Dark theme' : 'Light theme'}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: AppColors.primary }}
          />
        </View>

        <View style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.rowIcon}>
            <Text style={styles.emoji}>{'\u{1F4CF}'}</Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Metric Units</Text>
            <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>
              {isMetric ? 'km, m, km/h' : 'mi, yd, mph'}
            </Text>
          </View>
          <Switch
            value={isMetric}
            onValueChange={toggleMetric}
            trackColor={{ false: theme.border, true: AppColors.primary }}
          />
        </View>

        {/* About Section */}
        <Text style={[styles.sectionHeader, { color: theme.primary }]}>About</Text>

        <View style={[styles.infoRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.emoji}>{'\u{2139}\u{FE0F}'}</Text>
          <View style={styles.infoContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Pace Calculator</Text>
            <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={[styles.infoRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.emoji}>{'\u{1F512}'}</Text>
          <View style={styles.infoContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Privacy</Text>
            <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>
              This app works entirely offline. No data is collected, stored remotely, or shared
              with third parties.
            </Text>
          </View>
        </View>

        <View style={[styles.infoRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.emoji}>{'\u{1F4C4}'}</Text>
          <View style={styles.infoContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Legal</Text>
            <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>
              Race distance names and formats are used for reference only and are not affiliated
              with any race organization.
            </Text>
          </View>
        </View>

        {/* Links Section */}
        <Text style={[styles.sectionHeader, { color: theme.primary }]}>Links</Text>

        <TouchableOpacity
          style={[styles.linkRow, { backgroundColor: theme.card, borderColor: theme.border }]}
          onPress={() => Linking.openURL('https://pacecalc.app')}
          activeOpacity={0.7}
        >
          <Text style={styles.emoji}>{'\u{1F310}'}</Text>
          <View style={styles.infoContent}>
            <Text style={[styles.rowTitle, { color: theme.text }]}>Visit Website</Text>
          </View>
          <Text style={[styles.arrow, { color: theme.subtext }]}>{'\u{2197}\u{FE0F}'}</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowIcon: {
    width: 32,
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  arrow: {
    fontSize: 14,
  },
  emoji: {
    fontSize: 20,
    width: 32,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 32,
  },
});
