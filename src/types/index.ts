// ========== CATEGORIES ==========
export type CategoryId = 'sport' | 'admin' | 'writing' | 'creative' | 'drawing' | 'housework' | 'craft' | 'business' | 'other';

export const ALL_CATEGORIES: CategoryId[] = ['sport', 'admin', 'writing', 'creative', 'drawing', 'housework', 'craft', 'business', 'other'];

// ========== TIMER ==========
export type TimerDuration = 1500 | 2700 | 3600; // 25min, 45min, 1h

export const DURATION_OPTIONS: { value: TimerDuration; label: string; breakSeconds: number }[] = [
  { value: 1500, label: '25 min', breakSeconds: 300 },
  { value: 2700, label: '45 min', breakSeconds: 600 },
  { value: 3600, label: '1 heure', breakSeconds: 900 },
];

// ========== RARITY ==========
export type RarityTier = 1 | 2 | 3 | 4 | 5;

// Drop rates — rare Pokemon are VERY hard to get
export const RARITY_DROP_RATES: Record<RarityTier, number> = {
  1: 0.550,  // Commun      — 55%
  2: 0.310,  // Peu Commun  — 31%
  3: 0.120,  // Rare        — 12%
  4: 0.015,  // Epique      — 1.5%
  5: 0.005,  // Legendaire  — 0.5%
};

export const SHINY_RATE = 1 / 128; // 0.78%

// ========== POKEMON ==========
export interface CollectedPokemon {
  id: string;              // unique instance ID
  pokemonId: number;
  name: string;            // English name
  nameFr: string;          // French name
  isShiny: boolean;
  rarity: RarityTier;
  category: CategoryId;
  taskName: string;
  types: string[];
  caughtAt: string;
  artworkUrl: string;
  // Evolution & XP
  xp: number;
  level: number;           // derived: floor(xp / 10)
  evolutionStage: number;  // 1 = base, 2 = stage 2, 3 = stage 3
  canEvolve: boolean;
  isMega: boolean;
  megaArtworkUrl?: string;
}

export interface PokemonReward {
  pokemonId: number;
  name: string;
  nameFr: string;
  types: string[];
  isShiny: boolean;
  rarity: RarityTier;
  artworkUrl: string;
  captureRate: number;
}

// ========== EVOLUTION ==========
export interface EvolutionStage {
  id: number;
  nameFr: string;
}

export interface EvolutionChain {
  baseId: number;
  stages: EvolutionStage[];       // [base, stage2, stage3?]
  megaFinalId?: number;            // ID of the mega form (if exists)
  megaNameFr?: string;
}

// XP thresholds for evolution
export const EVOLUTION_XP = {
  STAGE_2: 300,    // ~30 matching pomodoros (25min) = ~12h of focused work
  STAGE_3: 1000,   // ~100 matching pomodoros = ~42h of work
  MEGA: 5000,      // ~500 matching pomodoros = ~208h of work (légendaire!)
};

// XP gained per pomodoro
export function getXpForPomodoro(durationSeconds: number, isMatchingType: boolean): number {
  const baseXp = Math.floor(durationSeconds / 150); // 25min=10, 45min=18, 1h=24
  return isMatchingType ? baseXp * 2 : baseXp;
}

// ========== ROSTER ==========
export interface RosterSlot {
  pokemonInstanceId: string | null; // references CollectedPokemon.id
}

export const ROSTER_SIZE = 6;

// ========== TASKS ==========
export interface TaskEntry {
  name: string;
  category: CategoryId;
  totalMinutes: number;
  pomodoroCount: number;
  lastUsed: string;
}

// ========== COLLECTION STATE ==========
export interface CollectionState {
  pokemon: CollectedPokemon[];
  tasks: Record<string, TaskEntry>;
  roster: RosterSlot[];
  stats: {
    totalPomodoros: number;
    totalMinutesFocused: number;
    pomodorosByCategory: Record<CategoryId, number>;
  };
}

// ========== CATEGORY CONFIG ==========
export interface CategoryConfig {
  id: CategoryId;
  label: string;
  icon: string;
  gradient: string;
  primaryTypes: number[];    // PokeAPI type IDs
  secondaryTypes: number[];
  thematicPokemon: number[];
}

// ========== APP STATE ==========
export type AppView = 'timer' | 'collection' | 'roster';
export type TimerPhase = 'idle' | 'category' | 'work' | 'break' | 'reward';

// ========== SESSION (for future Firebase) ==========
export interface SessionParticipant {
  uid: string;
  displayName: string;
  photoURL: string | null;
  taskName: string;
  category: CategoryId;
  timerDuration: TimerDuration;
  status: 'waiting' | 'focusing' | 'break' | 'rewarded';
  lastReward: {
    pokemonName: string;
    artworkUrl: string;
    isShiny: boolean;
    rarity: RarityTier;
  } | null;
}
