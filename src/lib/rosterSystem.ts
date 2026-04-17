import type { CollectedPokemon, RosterSlot } from '../types';
import { EVOLUTION_XP, ROSTER_SIZE, getXpForPomodoro } from '../types';
import { CHAIN_BY_ANY_ID } from './evolutionChains';
import { getArtworkUrl } from './pokemonSelector';

/**
 * Add XP to a roster Pokemon after a completed pomodoro.
 * Returns updated CollectedPokemon with new XP, level, evolutionStage, canEvolve.
 */
export function addXpToPokemon(
  pokemon: CollectedPokemon,
  durationSeconds: number,
  isMatchingCategory: boolean
): CollectedPokemon {
  const xpGained = getXpForPomodoro(durationSeconds, isMatchingCategory);
  const newXp = pokemon.xp + xpGained;
  const newLevel = Math.floor(newXp / 10);

  const chain = CHAIN_BY_ANY_ID.get(pokemon.pokemonId);
  const currentStage = pokemon.evolutionStage;

  let canEvolve = false;

  if (chain) {
    if (currentStage === 1 && newXp >= EVOLUTION_XP.STAGE_2 && chain.stages.length >= 2) {
      canEvolve = true;
    } else if (currentStage === 2 && newXp >= EVOLUTION_XP.STAGE_3 && chain.stages.length >= 3) {
      canEvolve = true;
    } else if (
      currentStage === chain.stages.length && // final stage
      chain.megaFinalId != null &&
      newXp >= EVOLUTION_XP.MEGA &&
      !pokemon.isMega
    ) {
      canEvolve = true; // can mega evolve
    }
  }

  return {
    ...pokemon,
    xp: newXp,
    level: newLevel,
    canEvolve,
  };
}

/**
 * Evolve a Pokemon to its next stage.
 * Returns updated CollectedPokemon with new pokemonId, name, artwork, stage.
 */
export function evolvePokemon(pokemon: CollectedPokemon): CollectedPokemon {
  const chain = CHAIN_BY_ANY_ID.get(pokemon.pokemonId);

  if (!chain) return pokemon; // no evolution

  const currentStageIndex = chain.stages.findIndex((s) => s.id === pokemon.pokemonId);

  // Mega evolution
  if (
    chain.megaFinalId != null &&
    pokemon.evolutionStage === chain.stages.length &&
    pokemon.xp >= EVOLUTION_XP.MEGA &&
    !pokemon.isMega
  ) {
    const megaArtworkUrl = getMegaArtworkUrl(chain.megaFinalId, pokemon.isShiny);
    return {
      ...pokemon,
      isMega: true,
      megaArtworkUrl,
      nameFr: chain.megaNameFr ?? `Mega-${pokemon.nameFr}`,
      canEvolve: false,
    };
  }

  // Normal evolution
  if (currentStageIndex < 0 || currentStageIndex >= chain.stages.length - 1) {
    return { ...pokemon, canEvolve: false }; // already at final stage
  }

  const nextStage = chain.stages[currentStageIndex + 1];
  const newArtworkUrl = getArtworkUrl(nextStage.id, pokemon.isShiny);
  const newEvolutionStage = (pokemon.evolutionStage + 1) as 1 | 2 | 3;

  return {
    ...pokemon,
    pokemonId: nextStage.id,
    name: nextStage.nameFr.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    nameFr: nextStage.nameFr,
    artworkUrl: newArtworkUrl,
    evolutionStage: newEvolutionStage,
    canEvolve: false, // reset until more XP
    isMega: false,
  };
}

/**
 * Check if a category matches a Pokemon's types for XP bonus.
 */
export function isCategoryMatchingPokemon(
  pokemon: CollectedPokemon,
  category: string
): boolean {
  // Check if the Pokemon's types align with the category
  const TYPE_CATEGORY_MAP: Record<string, string[]> = {
    sport: ['fighting', 'rock', 'ground', 'fire'],
    admin: ['electric', 'steel', 'psychic', 'normal'],
    writing: ['psychic', 'ghost', 'dark', 'fairy'],
    creative: ['fairy', 'fire', 'grass', 'poison'],
    housework: ['grass', 'water', 'normal', 'ground'],
    other: ['normal', 'psychic', 'fairy', 'water'],
  };

  const matchingTypes = TYPE_CATEGORY_MAP[category] ?? [];
  return pokemon.types.some((t) => matchingTypes.includes(t));
}

/**
 * Create an empty roster with ROSTER_SIZE null slots.
 */
export function createEmptyRoster(): RosterSlot[] {
  return Array.from({ length: ROSTER_SIZE }, () => ({ pokemonInstanceId: null }));
}

/**
 * Construct mega evolution artwork URL.
 * PokeAPI stores mega sprites with special form names, so we use a
 * workaround URL for the main artwork.
 */
function getMegaArtworkUrl(megaBaseId: number, isShiny: boolean): string {
  // For mega evolutions, the artwork is stored under special names in the
  // PokeAPI sprites repo. We use a known good approach.
  const base = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  // Mega forms have IDs like 10033-10036 (Megas in PokeAPI), but our approach
  // uses the regular official artwork of the mega (accessed via the form endpoint).
  // For simplicity, we use the base Pokemon artwork since mega-specific IDs
  // in raw sprites aren't reliably accessible. The visual evolution is conveyed
  // through the isMega flag and UI.
  return isShiny ? `${base}/shiny/${megaBaseId}.png` : `${base}/${megaBaseId}.png`;
}
