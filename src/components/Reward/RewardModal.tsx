import { useState, useEffect } from 'react';
import { PokemonCard } from './PokemonCard';
import type { PokemonReward } from '../../types';

interface RewardModalProps {
  pokemon: PokemonReward | null;
  onCollect: () => void;
}

type RevealStage = 'pokeball' | 'shaking' | 'opening' | 'reveal';

export function RewardModal({ pokemon, onCollect }: RewardModalProps) {
  const [stage, setStage] = useState<RevealStage>('pokeball');

  useEffect(() => {
    if (!pokemon) return;
    setStage('pokeball');

    const timers = [
      setTimeout(() => setStage('shaking'), 400),
      setTimeout(() => setStage('opening'), 2000),
      setTimeout(() => setStage('reveal'), 2600),
    ];

    return () => timers.forEach(clearTimeout);
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        className="relative flex flex-col items-center gap-6 p-8 rounded-3xl max-w-sm w-full"
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          border: pokemon.isShiny ? '2px solid #eab308' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: pokemon.isShiny
            ? '0 0 40px rgba(234, 179, 8, 0.3)'
            : '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pokeball animation */}
        {(stage === 'pokeball' || stage === 'shaking') && (
          <div
            className={`select-none ${stage === 'shaking' ? 'animate-pokeball-shake' : ''}`}
            style={{ animationIterationCount: stage === 'shaking' ? 4 : 0 }}
          >
            <PokeballSVG />
          </div>
        )}

        {/* Light burst */}
        {stage === 'opening' && (
          <div
            className="w-32 h-32 rounded-full animate-ping"
            style={{
              background: pokemon.isShiny
                ? 'radial-gradient(circle, #fbbf24 0%, transparent 70%)'
                : 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            }}
          />
        )}

        {/* Pokemon reveal */}
        {stage === 'reveal' && (
          <div className="flex flex-col items-center animate-float">
            <PokemonCard pokemon={pokemon} />

            <button
              onClick={onCollect}
              className="mt-6 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg transition-all active:scale-95 shadow-lg shadow-green-500/30"
            >
              Ajouter a la collection !
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PokeballSVG() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="46" fill="#1e293b" stroke="#475569" strokeWidth="4" />
      <path d="M2 48 H94" stroke="#475569" strokeWidth="4" />
      <path d="M2 48 A46 46 0 0 0 94 48" fill="#ef4444" />
      <circle cx="48" cy="48" r="12" fill="#1e293b" stroke="#475569" strokeWidth="4" />
      <circle cx="48" cy="48" r="6" fill="#f8fafc" />
    </svg>
  );
}
