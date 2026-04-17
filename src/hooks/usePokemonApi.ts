import { useCallback } from 'react';
import { getCached, setCache } from '../lib/apiCache';
import { getArtworkUrl, rollShiny, selectPokemonId } from '../lib/pokemonSelector';
import { getFrenchName } from '../lib/evolutionChains';
import type { CategoryId, PokemonReward, TimerDuration } from '../types';

interface PokemonApiData {
  name: string;
  types: { type: { name: string } }[];
}

interface SpeciesApiData {
  names: { language: { name: string }; name: string }[];
}

interface SlimSpecies {
  nameFr: string;
}

async function fetchPokemon(id: number): Promise<PokemonApiData> {
  const cacheKey = `pokemon:${id}`;
  const cached = getCached<PokemonApiData>(cacheKey);
  if (cached) return cached;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch pokemon ${id}`);
  const data = await res.json();
  const slim: PokemonApiData = {
    name: data.name,
    types: data.types.map((t: { type: { name: string } }) => ({ type: { name: t.type.name } })),
  };
  setCache(cacheKey, slim);
  return slim;
}

async function fetchSpecies(id: number): Promise<SlimSpecies> {
  const cacheKey = `species-v2:${id}`;
  const cached = getCached<SlimSpecies>(cacheKey);
  if (cached) return cached;

  // First check our static name table (no API call needed)
  const staticName = getFrenchName(id);
  if (staticName) {
    const slim: SlimSpecies = { nameFr: staticName };
    setCache(cacheKey, slim);
    return slim;
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch species ${id}`);
    const data: SpeciesApiData = await res.json();

    // Extract French name from names array
    const frEntry = data.names.find((n) => n.language.name === 'fr');
    const nameFr = frEntry?.name ?? '';

    const slim: SlimSpecies = { nameFr };
    setCache(cacheKey, slim);
    return slim;
  } catch {
    // If species fetch fails, return empty string (will fall back to English)
    return { nameFr: '' };
  }
}

export function usePokemonApi() {
  const getReward = useCallback(
    async (category: CategoryId, duration: TimerDuration = 1500): Promise<PokemonReward> => {
      const { pokemonId, rarity } = selectPokemonId(category, duration);
      const isShiny = rollShiny();

      const [pokemon, species] = await Promise.all([
        fetchPokemon(pokemonId),
        fetchSpecies(pokemonId),
      ]);

      const artworkUrl = getArtworkUrl(pokemonId, isShiny);

      // Preload image
      const img = new Image();
      img.src = artworkUrl;

      // French name: from static table or API; fallback to English
      const nameFr = species.nameFr || capitalize(pokemon.name.replace(/-/g, ' '));

      return {
        pokemonId,
        name: pokemon.name,
        nameFr,
        types: pokemon.types.map((t) => t.type.name),
        isShiny,
        rarity,
        artworkUrl,
        captureRate: 0, // No longer used for rarity; kept for interface compat
      };
    },
    []
  );

  return { getReward };
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
