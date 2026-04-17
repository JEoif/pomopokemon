import { EVOLUTION_XP, ROSTER_SIZE } from '../../types';
import { RosterSlotCard } from './RosterSlotCard';
import type { CollectedPokemon, CollectionState } from '../../types';

interface RosterViewProps {
  collection: CollectionState;
  onRemoveFromRoster: (slotIndex: number) => void;
  onEvolve: (instanceId: string) => void;
}

export function RosterView({ collection, onRemoveFromRoster, onEvolve }: RosterViewProps) {
  const roster = collection.roster;
  const pokemonMap = new Map(collection.pokemon.map((p) => [p.id, p]));

  // Get roster Pokemon
  const rosterPokemon: (CollectedPokemon | null)[] = roster.map((slot) =>
    slot.pokemonInstanceId ? (pokemonMap.get(slot.pokemonInstanceId) ?? null) : null
  );

  const filledCount = rosterPokemon.filter(Boolean).length;

  // Pokemon that can evolve
  const readyToEvolve = rosterPokemon.filter((p) => p?.canEvolve).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto px-4 pb-24">
      {/* Header */}
      <div className="text-center pt-4">
        <h2 className="text-xl font-bold text-white">Mon Roster</h2>
        <p className="text-slate-400 text-sm mt-1">
          {filledCount}/{ROSTER_SIZE} Pokemon · Gagne des XP en faisant leurs specialite
        </p>
        {readyToEvolve > 0 && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-medium">
            <span>✨</span>
            <span>{readyToEvolve} Pokemon pret{readyToEvolve > 1 ? 's' : ''} a evoluer !</span>
          </div>
        )}
      </div>

      {/* XP info */}
      <div className="bg-slate-800/40 border border-slate-700/30 rounded-2xl p-4 text-xs text-slate-400 space-y-1">
        <p className="text-slate-300 font-medium mb-2">Comment gagner des XP ?</p>
        <p>🍅 Chaque pomodoro = XP pour tes 6 Pokemon</p>
        <p>⚡ Tache correspondante au type = XP x2</p>
        <p className="mt-2 text-slate-500">
          Stage 2 : {EVOLUTION_XP.STAGE_2} XP &nbsp;|&nbsp;
          Stage 3 : {EVOLUTION_XP.STAGE_3} XP &nbsp;|&nbsp;
          Mega : {EVOLUTION_XP.MEGA} XP
        </p>
      </div>

      {/* Roster grid (2 columns) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {Array.from({ length: ROSTER_SIZE }, (_, i) => (
          <RosterSlotCard
            key={i}
            slotIndex={i}
            pokemon={rosterPokemon[i]}
            onRemove={onRemoveFromRoster}
            onEvolve={onEvolve}
          />
        ))}
      </div>

      {/* Hint */}
      {filledCount < ROSTER_SIZE && (
        <div className="text-center text-xs text-slate-600">
          Va dans ta <span className="text-slate-500">Collection</span> et clique sur "+ Roster"
          pour ajouter un Pokemon
        </div>
      )}
    </div>
  );
}
