import { motion } from 'framer-motion';
import { RARITY_CONFIG } from '../../lib/raritySystem';
import { TYPE_COLORS } from '../../lib/typeColorMap';
import { EVOLUTION_XP } from '../../types';
import type { CollectedPokemon } from '../../types';

interface CollectionCardProps {
  pokemon: CollectedPokemon;
  index: number;
  isInRoster?: boolean;
  onAssignToRoster?: (instanceId: string) => void;
  onEvolve?: (instanceId: string) => void;
}

export function CollectionCard({
  pokemon,
  index,
  isInRoster,
  onAssignToRoster,
  onEvolve,
}: CollectionCardProps) {
  const rarity = RARITY_CONFIG[pokemon.rarity];
  const mainTypeColor = TYPE_COLORS[pokemon.types[0]] || '#475569';

  // XP progress toward next evolution
  const nextThreshold = getNextXpThreshold(pokemon);
  const prevThreshold = getPrevXpThreshold(pokemon);
  const xpProgress = nextThreshold
    ? Math.min(1, (pokemon.xp - prevThreshold) / (nextThreshold - prevThreshold))
    : 1;

  const artworkSrc = pokemon.isMega && pokemon.megaArtworkUrl
    ? pokemon.megaArtworkUrl
    : pokemon.artworkUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className={`relative rounded-xl p-2 flex flex-col items-center gap-1 border transition-transform hover:scale-105 cursor-pointer ${
        pokemon.isShiny ? 'animate-pulse-glow' : ''
      } ${isInRoster ? 'ring-2 ring-pink-500/50' : ''}`}
      style={{
        background: `linear-gradient(180deg, ${mainTypeColor}15 0%, #0f172a 100%)`,
        borderColor: pokemon.rarity >= 4 ? rarity.color + '60' : '#334155',
      }}
    >
      {/* Badges */}
      <div className="absolute top-1 right-1 flex flex-col items-end gap-0.5">
        {pokemon.isShiny && <span className="text-xs">✨</span>}
        {pokemon.isMega && <span className="text-[8px] text-yellow-400 font-bold">MEGA</span>}
        {isInRoster && <span className="text-[8px] text-pink-400">●</span>}
      </div>

      {/* Stage indicator */}
      {pokemon.evolutionStage > 1 && (
        <div className="absolute top-1 left-1">
          <span className="text-[7px] text-slate-500">
            {'◆'.repeat(pokemon.evolutionStage)}
          </span>
        </div>
      )}

      {/* Image */}
      <img
        src={artworkSrc}
        alt={pokemon.nameFr || pokemon.name}
        className="w-16 h-16 object-contain"
        loading="lazy"
      />

      {/* French name */}
      <span className="text-[10px] font-semibold text-white capitalize truncate w-full text-center">
        {pokemon.nameFr || pokemon.name}
      </span>

      {/* Rarity stars */}
      <div className="flex gap-px">
        {[...Array(rarity.stars)].map((_, i) => (
          <span key={i} className="text-[8px]" style={{ color: rarity.color }}>★</span>
        ))}
      </div>

      {/* Level */}
      <span className="text-[9px] text-slate-500">Niv. {pokemon.level}</span>

      {/* XP bar */}
      <div className="w-full h-1 bg-slate-700/60 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${xpProgress * 100}%`,
            background: pokemon.canEvolve
              ? 'linear-gradient(90deg, #a855f7, #ec4899)'
              : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
          }}
        />
      </div>

      {/* Can evolve button */}
      {pokemon.canEvolve && onEvolve && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEvolve(pokemon.id);
          }}
          className="mt-0.5 text-[9px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/40 transition-all"
        >
          Evoluer !
        </button>
      )}

      {/* Assign to roster button */}
      {!isInRoster && onAssignToRoster && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAssignToRoster(pokemon.id);
          }}
          className="mt-0.5 text-[9px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-400 border border-slate-600/30 hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/30 transition-all"
        >
          + Roster
        </button>
      )}
    </motion.div>
  );
}

function getNextXpThreshold(pokemon: CollectedPokemon): number | null {
  if (pokemon.isMega) return null;
  if (pokemon.evolutionStage === 1) return EVOLUTION_XP.STAGE_2;
  if (pokemon.evolutionStage === 2) return EVOLUTION_XP.STAGE_3;
  // If at final stage and has mega potential
  if (pokemon.canEvolve || pokemon.xp < EVOLUTION_XP.MEGA) return EVOLUTION_XP.MEGA;
  return null;
}

function getPrevXpThreshold(pokemon: CollectedPokemon): number {
  if (pokemon.evolutionStage === 1) return 0;
  if (pokemon.evolutionStage === 2) return EVOLUTION_XP.STAGE_2;
  return EVOLUTION_XP.STAGE_3;
}
