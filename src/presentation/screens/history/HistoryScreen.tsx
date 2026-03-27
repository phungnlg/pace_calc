import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useAppStore } from '../../../store/useAppStore';
import { useTheme } from '../../../core/theme/useTheme';
import { HapticService } from '../../../core/services/hapticService';
import { ChipSelector } from '../../shared/ChipSelector';
import { HistoryItemCard } from './HistoryItemCard';

type HistoryFilter = 'all' | 'triathlon' | 'running';

interface HistoryEntry {
  isTriathlon: boolean;
  id: string;
  distanceLabel: string;
  totalSeconds: number;
  createdAt: string;
}

export default function HistoryScreen() {
  const theme = useTheme();
  const triHistory = useAppStore((s) => s.triHistory);
  const runHistory = useAppStore((s) => s.runHistory);
  const loadTriHistory = useAppStore((s) => s.loadTriHistory);
  const loadRunHistory = useAppStore((s) => s.loadRunHistory);
  const deleteTriCalc = useAppStore((s) => s.deleteTriCalc);
  const deleteRunCalc = useAppStore((s) => s.deleteRunCalc);
  const clearAllTriCalcs = useAppStore((s) => s.clearAllTriCalcs);
  const clearAllRunCalcs = useAppStore((s) => s.clearAllRunCalcs);

  const [filter, setFilter] = useState<HistoryFilter>('all');

  useEffect(() => {
    loadTriHistory();
    loadRunHistory();
  }, [loadTriHistory, loadRunHistory]);

  const items: HistoryEntry[] = [];

  if (filter !== 'running') {
    for (const calc of triHistory) {
      items.push({
        isTriathlon: true,
        id: calc.id,
        distanceLabel: calc.raceType,
        totalSeconds: calc.totalSeconds,
        createdAt: calc.createdAt,
      });
    }
  }

  if (filter !== 'triathlon') {
    for (const calc of runHistory) {
      items.push({
        isTriathlon: false,
        id: calc.id,
        distanceLabel: calc.distanceType,
        totalSeconds: calc.totalSeconds,
        createdAt: calc.createdAt,
      });
    }
  }

  items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const confirmClearAll = () => {
    Alert.alert(
      'Clear All History',
      'This will delete all saved calculations. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            HapticService.heavy();
            clearAllTriCalcs();
            clearAllRunCalcs();
          },
        },
      ]
    );
  };

  const confirmDelete = (item: HistoryEntry) => {
    Alert.alert('Delete', 'Delete this calculation?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          HapticService.medium();
          if (item.isTriathlon) {
            deleteTriCalc(item.id);
          } else {
            deleteRunCalc(item.id);
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>History</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={confirmClearAll} style={styles.iconBtn}>
            <Text style={[styles.clearText, { color: theme.subtext }]}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterContainer}>
        <ChipSelector
          items={[
            { key: 'all', label: 'All' },
            { key: 'triathlon', label: 'Triathlon' },
            { key: 'running', label: 'Running' },
          ]}
          selectedKey={filter}
          onSelected={(key) => setFilter(key as HistoryFilter)}
        />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyIcon, { color: theme.subtext + '50' }]}>
            {'\u{1F4CB}'}
          </Text>
          <Text style={[styles.emptyText, { color: theme.subtext + '80' }]}>
            No calculations yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.isTriathlon ? 'tri' : 'run'}_${item.id}`}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HistoryItemCard
              isTriathlon={item.isTriathlon}
              distanceLabel={item.distanceLabel}
              totalSeconds={item.totalSeconds}
              createdAt={item.createdAt}
              onPress={() => {
                // Navigate to detail - in a tab-based app we just show info
              }}
              onDelete={() => confirmDelete(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  iconBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
