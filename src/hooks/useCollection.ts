import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { addXpToPokemon, evolvePokemon, isCategoryMatchingPokemon, createEmptyRoster } from '../lib/rosterSystem';
import type {
  CategoryId,
  CollectedPokemon,
  CollectionState,
  PokemonReward,
  RosterSlot,
} from '../types';
import { ROSTER_SIZE } from '../types';

const INITIAL_STATE: CollectionState = {
  pokemon: [],
  tasks: {},
  roster: createEmptyRoster(),
  stats: {
    totalPomodoros: 0,
    totalMinutesFocused: 0,
    pomodorosByCategory: {
      sport: 0,
      admin: 0,
      writing: 0,
      creative: 0,
      drawing: 0,
      housework: 0,
      craft: 0,
      business: 0,
      other: 0,
    },
  },
};

function normalizeTaskKey(name: string): string {
  return name.trim().toLowerCase();
}

function migrateState(raw: Partial<CollectionState>): CollectionState {
  const base = { ...INITIAL_STATE };

  // Migrate pokemon: ensure all fields exist
  const pokemon: CollectedPokemon[] = (raw.pokemon ?? []).map((p) => ({
    id: p.id ?? `${p.pokemonId}-${p.caughtAt ?? Date.now()}`,
    pokemonId: p.pokemonId,
    name: p.name ?? '',
    nameFr: p.nameFr ?? p.name ?? '',
    isShiny: p.isShiny ?? false,
    rarity: p.rarity ?? 1,
    category: (p.category as CategoryId) ?? 'other',
    taskName: p.taskName ?? '',
    types: p.types ?? [],
    caughtAt: p.caughtAt ?? new Date().toISOString(),
    artworkUrl: p.artworkUrl ?? '',
    xp: p.xp ?? 0,
    level: p.level ?? 0,
    evolutionStage: p.evolutionStage ?? 1,
    canEvolve: p.canEvolve ?? false,
    isMega: p.isMega ?? false,
    megaArtworkUrl: p.megaArtworkUrl,
  }));

  // Migrate roster
  const roster: RosterSlot[] = raw.roster
    ? raw.roster.slice(0, ROSTER_SIZE)
    : createEmptyRoster();

  // Pad roster if needed
  while (roster.length < ROSTER_SIZE) {
    roster.push({ pokemonInstanceId: null });
  }

  // Migrate stats
  const stats = {
    totalPomodoros: raw.stats?.totalPomodoros ?? 0,
    totalMinutesFocused: raw.stats?.totalMinutesFocused ?? 0,
    pomodorosByCategory: {
      ...base.stats.pomodorosByCategory,
      ...(raw.stats?.pomodorosByCategory ?? {}),
    },
  };

  return {
    pokemon,
    tasks: raw.tasks ?? {},
    roster,
    stats,
  };
}

// Stable storage key — never change this, or data will be lost
const STORAGE_KEY = 'pomopokemon-save';

// Old keys to migrate from (add here whenever an old key is discovered)
const LEGACY_KEYS = [
  'pomodoro-pokemon-collection',
  'pomodoro-pokemon-collection-v2',
];

function loadAndMigrateLegacy(): CollectionState | null {
  for (const key of LEGACY_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.pokemon || parsed.tasks)) {
        // Found old data — migrate it to the new key and remove the old one
        const migrated = migrateState(parsed as Partial<CollectionState>);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        localStorage.removeItem(key);
        return migrated;
      }
    } catch {
      // corrupt entry — skip
    }
  }
  return null;
}

export function useCollection() {
  // On first load: check legacy keys and migrate transparently
  const initialValue = (() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) return JSON.parse(existing) as CollectionState;
    } catch {}
    return loadAndMigrateLegacy() ?? INITIAL_STATE;
  })();

  const [rawCollection, setCollection] = useLocalStorage<CollectionState>(
    STORAGE_KEY,
    initialValue
  );

  // Always migrate on read (handles any missing fields added in future updates)
  const collection = migrateState(rawCollection as Partial<CollectionState>);

  const addPokemon = useCallback(
    (
      reward: PokemonReward,
      category: CategoryId,
      taskName: string,
      durationSeconds: number = 1500
    ) => {
      const instanceId = `${reward.pokemonId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const durationMinutes = Math.round(durationSeconds / 60);

      const newPokemon: CollectedPokemon = {
        id: instanceId,
        pokemonId: reward.pokemonId,
        name: reward.name,
        nameFr: reward.nameFr,
        isShiny: reward.isShiny,
        rarity: reward.rarity,
        category,
        taskName,
        types: reward.types,
        caughtAt: new Date().toISOString(),
        artworkUrl: reward.artworkUrl,
        xp: 0,
        level: 0,
        evolutionStage: 1,
        canEvolve: false,
        isMega: false,
      };

      const taskKey = normalizeTaskKey(taskName);

      setCollection((prev) => {
        const existingTask = prev.tasks?.[taskKey];
        return {
          ...prev,
          pokemon: [newPokemon, ...(prev.pokemon ?? [])],
          tasks: {
            ...(prev.tasks ?? {}),
            [taskKey]: {
              name: taskName,
              category,
              totalMinutes: (existingTask?.totalMinutes ?? 0) + durationMinutes,
              pomodoroCount: (existingTask?.pomodoroCount ?? 0) + 1,
              lastUsed: new Date().toISOString(),
            },
          },
          stats: {
            totalPomodoros: (prev.stats?.totalPomodoros ?? 0) + 1,
            totalMinutesFocused: (prev.stats?.totalMinutesFocused ?? 0) + durationMinutes,
            pomodorosByCategory: {
              ...INITIAL_STATE.stats.pomodorosByCategory,
              ...(prev.stats?.pomodorosByCategory ?? {}),
              [category]: ((prev.stats?.pomodorosByCategory?.[category] ?? 0)) + 1,
            },
          },
        };
      });
    },
    [setCollection]
  );

  /**
   * Give XP to all roster Pokemon after a completed pomodoro.
   */
  const giveRosterXp = useCallback(
    (category: CategoryId, durationSeconds: number) => {
      setCollection((prev) => {
        const rosterIds = new Set(
          (prev.roster ?? [])
            .map((s) => s.pokemonInstanceId)
            .filter(Boolean) as string[]
        );

        if (rosterIds.size === 0) return prev;

        const updatedPokemon = (prev.pokemon ?? []).map((p) => {
          if (!rosterIds.has(p.id)) return p;
          const isMatch = isCategoryMatchingPokemon(p, category);
          return addXpToPokemon(p, durationSeconds, isMatch);
        });

        return { ...prev, pokemon: updatedPokemon };
      });
    },
    [setCollection]
  );

  /**
   * Assign a Pokemon to a roster slot.
   * Removes it from any other slot first.
   */
  const assignToRoster = useCallback(
    (pokemonInstanceId: string, slotIndex: number) => {
      setCollection((prev) => {
        const roster = [...(prev.roster ?? createEmptyRoster())];
        // Remove from current slot if already in roster
        for (let i = 0; i < roster.length; i++) {
          if (roster[i].pokemonInstanceId === pokemonInstanceId) {
            roster[i] = { pokemonInstanceId: null };
          }
        }
        if (slotIndex >= 0 && slotIndex < ROSTER_SIZE) {
          roster[slotIndex] = { pokemonInstanceId };
        }
        return { ...prev, roster };
      });
    },
    [setCollection]
  );

  /**
   * Remove a Pokemon from its roster slot.
   */
  const removeFromRoster = useCallback(
    (slotIndex: number) => {
      setCollection((prev) => {
        const roster = [...(prev.roster ?? createEmptyRoster())];
        if (slotIndex >= 0 && slotIndex < ROSTER_SIZE) {
          roster[slotIndex] = { pokemonInstanceId: null };
        }
        return { ...prev, roster };
      });
    },
    [setCollection]
  );

  /**
   * Evolve a roster Pokemon.
   */
  const evolveRosterPokemon = useCallback(
    (pokemonInstanceId: string) => {
      setCollection((prev) => {
        const updatedPokemon = (prev.pokemon ?? []).map((p) => {
          if (p.id !== pokemonInstanceId) return p;
          if (!p.canEvolve) return p;
          return evolvePokemon(p);
        });
        return { ...prev, pokemon: updatedPokemon };
      });
    },
    [setCollection]
  );

  const uniqueCount = new Set(collection.pokemon.map((p) => p.pokemonId)).size;
  const shinyCount = collection.pokemon.filter((p) => p.isShiny).length;

  // Direct setter for import — wraps raw setCollection with migration
  const importCollection = useCallback(
    (state: CollectionState) => {
      setCollection(state);
    },
    [setCollection]
  );

  return {
    collection,
    addPokemon,
    giveRosterXp,
    assignToRoster,
    removeFromRoster,
    evolveRosterPokemon,
    setCollection: importCollection,
    uniqueCount,
    shinyCount,
  };
}
