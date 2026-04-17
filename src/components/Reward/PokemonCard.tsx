import { TYPE_COLORS } from '../../lib/typeColorMap';
import { RARITY_CONFIG } from '../../lib/raritySystem';
import { TYPE_LABELS_FR } from '../../lib/typeColorMap';
import type { PokemonReward } from '../../types';

interface PokemonCardProps {
  pokemon: PokemonReward;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const rarity = RARITY_CONFIG[pokemon.rarity];

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Pokemon image */}
      <div className="relative">
        {pokemon.isShiny && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className="absolute animate-sparkle text-yellow-300 text-lg"
                style={{
                  animationDelay: `${i * 0.25}s`,
                  top: `${20 + Math.sin(i * 1.05) * 40}%`,
                  left: `${20 + Math.cos(i * 1.05) * 40}%`,
                }}
              >
                ✦
              </span>
            ))}
          </div>
        )}
        <img
          src={pokemon.artworkUrl}
          alt={pokemon.nameFr || pokemon.name}
          className="w-48 h-48 object-contain drop-shadow-2xl"
          loading="eager"
        />
      </div>

      {/* French name (primary) + English (smaller) */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          {pokemon.nameFr || pokemon.name}
          {pokemon.isShiny && <span className="text-yellow-400 text-lg">✨</span>}
        </h3>
        {pokemon.nameFr && pokemon.nameFr !== pokemon.name && (
          <p className="text-xs text-slate-500 capitalize mt-0.5">{pokemon.name}</p>
        )}
      </div>

      {/* Type badges (French labels) */}
      <div className="flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase text-white"
            style={{ backgroundColor: TYPE_COLORS[type] || '#888' }}
          >
            {TYPE_LABELS_FR[type] || type}
          </span>
        ))}
      </div>

      {/* Rarity stars */}
      <div className="flex items-center gap-1">
        {[...Array(rarity.stars)].map((_, i) => (
          <span key={i} className="text-lg" style={{ color: rarity.color }}>★</span>
        ))}
        {[...Array(5 - rarity.stars)].map((_, i) => (
          <span key={i} className="text-lg text-slate-700">★</span>
        ))}
        <span
          className="ml-2 text-xs font-semibold uppercase tracking-wider"
          style={{ color: rarity.color }}
        >
          {rarity.labelFr}
        </span>
      </div>
    </div>
  );
}
