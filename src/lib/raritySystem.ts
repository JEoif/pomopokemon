import type { RarityTier } from '../types';

/**
 * Rarity is now determined by drop rate percentages, not capture_rate.
 * The rollRarity() function in pokemonSelector.ts handles the roll.
 * This file provides display config for rarity tiers.
 */

export const RARITY_CONFIG: Record<RarityTier, {
  label: string;
  labelFr: string;
  color: string;
  bgGradient: string;
  stars: number;
}> = {
  1: {
    label: 'Common',
    labelFr: 'Commun',
    color: '#9ca3af',
    bgGradient: 'linear-gradient(135deg, #374151, #4b5563)',
    stars: 1,
  },
  2: {
    label: 'Uncommon',
    labelFr: 'Peu Commun',
    color: '#22c55e',
    bgGradient: 'linear-gradient(135deg, #14532d, #166534)',
    stars: 2,
  },
  3: {
    label: 'Rare',
    labelFr: 'Rare',
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #1e3a5f, #1d4ed8)',
    stars: 3,
  },
  4: {
    label: 'Epic',
    labelFr: 'Epique',
    color: '#a855f7',
    bgGradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
    stars: 4,
  },
  5: {
    label: 'Legendary',
    labelFr: 'Legendaire',
    color: '#eab308',
    bgGradient: 'linear-gradient(135deg, #713f12, #ca8a04)',
    stars: 5,
  },
};

/**
 * Get rarity label in French.
 */
export function getRarityLabel(rarity: RarityTier): string {
  return RARITY_CONFIG[rarity].labelFr;
}

/**
 * Get rarity color.
 */
export function getRarityColor(rarity: RarityTier): string {
  return RARITY_CONFIG[rarity].color;
}
