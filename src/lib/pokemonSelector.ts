import type { CategoryId, RarityTier, TimerDuration } from '../types';
import { RARITY_DROP_RATES, SHINY_RATE } from '../types';
import { RARITY_POOLS, TYPE_POOLS, THEMATIC_POOLS } from './pokemonPools';
import { CATEGORY_TYPE_MAP } from './taskDetector';
import { isBaseForm } from './evolutionChains';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Drop rates per session duration.
 * Legendary and epic are very hard to get. Longer sessions give a small but
 * meaningful boost to the top tiers.
 *
 * 25min:  55   / 31   / 12  / 1.5 / 0.5
 * 45min:  52   / 32   / 13  / 2.2 / 0.8
 * 1h:     48   / 33   / 15  / 3.0 / 1.0
 */
const DURATION_RATES: Record<TimerDuration, Record<RarityTier, number>> = {
  1500: { 1: 0.550, 2: 0.310, 3: 0.120, 4: 0.015, 5: 0.005 },
  2700: { 1: 0.520, 2: 0.320, 3: 0.130, 4: 0.022, 5: 0.008 },
  3600: { 1: 0.480, 2: 0.330, 3: 0.150, 4: 0.030, 5: 0.010 },
};

/**
 * Roll a rarity tier based on session duration.
 * Longer sessions give better drop rates.
 */
export function rollRarity(duration: TimerDuration = 1500): RarityTier {
  const rates = DURATION_RATES[duration] ?? RARITY_DROP_RATES;
  const roll = Math.random();
  let cumulative = 0;
  for (const [tier, rate] of Object.entries(rates)) {
    cumulative += rate;
    if (roll < cumulative) return Number(tier) as RarityTier;
  }
  return 1; // fallback
}

/**
 * Select a Pokemon ID based on category, duration and rarity.
 *
 * Flow:
 * 1. Roll rarity tier (rates depend on session duration)
 * 2. 50% chance: pick from category's type pools (type influence)
 * 3. 10% chance: pick from category's thematic pool
 * 4. 40% chance: pick from full rarity pool (random)
 * 5. Ensure Pokemon is base form
 */
export function selectPokemonId(
  category: CategoryId,
  duration: TimerDuration = 1500,
): { pokemonId: number; rarity: RarityTier } {
  const rarity = rollRarity(duration);
  const rarityPool = RARITY_POOLS[rarity];

  if (!rarityPool || rarityPool.length === 0) {
    return { pokemonId: 25, rarity: 1 }; // Pikachu fallback
  }

  const roll = Math.random();
  const typeConfig = CATEGORY_TYPE_MAP[category];
  const thematicPool = THEMATIC_POOLS[category] ?? [];

  const thematicChance = 0.10;
  const typeChance = 0.50;

  let pokemonId: number;

  if (roll < thematicChance && thematicPool.length > 0) {
    // Thematic pool (10% normally, 25% in co-op)
    // Filter thematic pool to only include base forms in current rarity pool
    const filtered = thematicPool.filter((id) => rarityPool.includes(id));
    if (filtered.length > 0) {
      pokemonId = pickRandom(filtered);
    } else {
      pokemonId = pickRandom(thematicPool);
    }
  } else if (roll < thematicChance + typeChance) {
    // Type-influenced pool (50%)
    const allTypes = [...typeConfig.primary, ...typeConfig.secondary];
    const typeId = pickRandom(allTypes);
    const typePool = TYPE_POOLS[typeId] ?? [];

    // Filter to base forms in the right rarity pool
    const filtered = typePool.filter((id) => rarityPool.includes(id) && isBaseForm(id));
    if (filtered.length > 0) {
      pokemonId = pickRandom(filtered);
    } else if (typePool.length > 0) {
      // Fallback: any base form from type pool
      const baseForms = typePool.filter(isBaseForm);
      pokemonId = baseForms.length > 0 ? pickRandom(baseForms) : pickRandom(typePool);
    } else {
      pokemonId = pickRandom(rarityPool);
    }
  } else {
    // Random from full rarity pool (40%)
    pokemonId = pickRandom(rarityPool);
  }

  // Safety: ensure base form
  if (!isBaseForm(pokemonId)) {
    // Try to pick another from the rarity pool
    const baseForms = rarityPool.filter(isBaseForm);
    if (baseForms.length > 0) {
      pokemonId = pickRandom(baseForms);
    }
  }

  return { pokemonId, rarity };
}

/**
 * Roll for shiny (1/128 = 0.78%)
 */
export function rollShiny(): boolean {
  return Math.random() < SHINY_RATE;
}

/**
 * Get official artwork URL for a Pokemon.
 */
export function getArtworkUrl(id: number, shiny: boolean): string {
  const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  return shiny ? `${base}/shiny/${id}.png` : `${base}/${id}.png`;
}
