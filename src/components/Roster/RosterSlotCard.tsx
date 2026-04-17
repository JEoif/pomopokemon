import { RARITY_CONFIG } from '../../lib/raritySystem';
import { TYPE_COLORS } from '../../lib/typeColorMap';
import { EVOLUTION_XP } from '../../types';
import type { CollectedPokemon } from '../../types';

interface RosterSlotCardProps {
  slotIndex: number;
  pokemon: CollectedPokemon | null;
  onRemove: (slotIndex: number) => void;
  onEvolve: (instanceId: string) => void;
}

export function RosterSlotCard({ slotIndex, pokemon, onRemove, onEvolve }: RosterSlotCardProps) {
  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-700/50 bg-slate-800/20 p-4 min-h-[160px]">
        <span className="text-slate-600 text-3xl">+</span>
        <p className="text-xs text-slate-600 text-center">Slot {slotIndex + 1}</p>
        <p className="text-[10px] text-slate-700 text-center">Ajoute un Pokemon<br />depuis ta collection</p>
      </div>
    );
  }

  const rarity = RARITY_CONFIG[pokemon.rarity];
  const mainTypeColor = TYPE_COLORS[pokemon.types[0]] || '#475569';

  // XP progress
  const nextXp = getNextThreshold(pokemon);
  const prevXp = getPrevThreshold(pokemon);
  const xpPct = nextXp
    ? Math.round(((pokemon.xp - prevXp) / (nextXp - prevXp)) * 100)
    : 100;

  const artworkSrc = pokemon.isMega && pokemon.megaArtworkUrl
    ? pokemon.megaArtworkUrl
    : pokemon.artworkUrl;

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-2xl border p-3 relative"
      style={{
        background: `linear-gradient(180deg, ${mainTypeColor}20 0%, #0f172a 100%)`,
        borderColor: pokemon.rarity >= 4 ? rarity.color + '50' : '#334155',
      }}
    >
      {/* Remove button */}
      <button
        onClick={() => onRemove(slotIndex)}
        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-slate-700/80 text-slate-400 hover:text-red-400 hover:bg-slate-600/80 text-xs flex items-center justify-center transition-all"
      >
        ×
      </button>

      {/* Mega badge */}
      {pokemon.isMega && (
        <span className="absolute top-2 left-2 text-[8px] text-yellow-400 font-bold bg-yellow-400/10 rounded px-1">
          MEGA
        </span>
      )}

      {/* Artwork */}
      <img
        src={artworkSrc}
        alt={pokemon.nameFr || pokemon.name}
        className="w-20 h-20 object-contain drop-shadow-lg"
        loading="lazy"
      />

      {/* Name */}
      <div className="text-center">
        <p className="text-sm font-bold text-white leading-tight">
          {pokemon.nameFr || pokemon.name}
          {pokemon.isShiny && <span className="ml-1 text-yellow-400">✨</span>}
        </p>
        <p className="text-[10px] text-slate-500">Niv. {pokemon.level}</p>
      </div>

      {/* Rarity */}
      <div className="flex gap-0.5">
        {[...Array(rarity.stars)].map((_, i) => (
          <span key={i} className="text-[10px]" style={{ color: rarity.color }}>★</span>
        ))}
      </div>

      {/* XP bar */}
      <div className="w-full">
        <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
          <span>XP {pokemon.xp}</span>
          {nextXp && <span>/{nextXp}</span>}
          {!nextXp && <span>MAX</span>}
        </div>
        <div className="w-full h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${xpPct}%`,
              background: pokemon.canEvolve
                ? 'linear-gradient(90deg, #a855f7, #ec4899)'
                : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            }}
          />
        </div>
      </div>

      {/* Evolution stage */}
      <div className="text-[9px] text-slate-500">
        {pokemon.isMega ? '⚡ Mega' : `Stage ${pokemon.evolutionStage}`}
      </div>

      {/* Evolve button */}
      {pokemon.canEvolve && (
        <button
          onClick={() => onEvolve(pokemon.id)}
          className="w-full py-1.5 rounded-xl text-xs font-bold text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            boxShadow: '0 0 12px rgba(168, 85, 247, 0.4)',
          }}
        >
          {pokemon.isMega ? '⚡ Mega ?' : '✨ Evoluer !'}
        </button>
      )}

      {/* XP needed info */}
      {!pokemon.canEvolve && nextXp && (
        <p className="text-[9px] text-slate-600 text-center">
          {nextXp - pokemon.xp} XP pour evoluer
        </p>
      )}
    </div>
  );
}

function getNextThreshold(pokemon: CollectedPokemon): number | null {
  if (pokemon.isMega) return null;
  if (pokemon.evolutionStage === 1) return EVOLUTION_XP.STAGE_2;
  if (pokemon.evolutionStage === 2) return EVOLUTION_XP.STAGE_3;
  return EVOLUTION_XP.MEGA; // final stage = mega threshold
}

function getPrevThreshold(pokemon: CollectedPokemon): number {
  if (pokemon.evolutionStage === 1) return 0;
  if (pokemon.evolutionStage === 2) return EVOLUTION_XP.STAGE_2;
  return EVOLUTION_XP.STAGE_3;
}
