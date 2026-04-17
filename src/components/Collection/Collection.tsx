import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CollectionCard } from './CollectionCard';
import { CollectionStats } from './CollectionStats';
import { TaskList } from './TaskList';
import { CATEGORY_META } from '../../lib/taskDetector';
import { ALL_CATEGORIES } from '../../types';
import type { CollectionState, CategoryId } from '../../types';

interface CollectionProps {
  collection: CollectionState;
  uniqueCount: number;
  shinyCount: number;
  onAssignToRoster?: (instanceId: string) => void;
  onEvolve?: (instanceId: string) => void;
  rosterIds?: Set<string>;
}

type TabMode = 'pokemon' | 'tasks';
type SortMode = 'recent' | 'rarity' | 'name' | 'level';

export function Collection({
  collection,
  uniqueCount,
  shinyCount,
  onAssignToRoster,
  onEvolve,
  rosterIds = new Set(),
}: CollectionProps) {
  const [tab, setTab] = useState<TabMode>('pokemon');
  const [filter, setFilter] = useState<CategoryId | 'all' | 'shiny'>('all');
  const [sort, setSort] = useState<SortMode>('recent');

  const filtered = collection.pokemon.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'shiny') return p.isShiny;
    return p.category === filter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'rarity') return b.rarity - a.rarity;
    if (sort === 'name') return (a.nameFr || a.name).localeCompare(b.nameFr || b.name);
    if (sort === 'level') return b.level - a.level;
    return new Date(b.caughtAt).getTime() - new Date(a.caughtAt).getTime();
  });

  return (
    <div className="flex flex-col gap-5 w-full max-w-lg mx-auto px-4 pb-24">
      {/* Stats */}
      <CollectionStats
        stats={collection.stats}
        uniqueCount={uniqueCount}
        shinyCount={shinyCount}
        totalCaught={collection.pokemon.length}
      />

      {/* Tab switch */}
      <div className="flex bg-slate-800/60 rounded-xl p-1 border border-slate-700/30">
        <button
          onClick={() => setTab('pokemon')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'pokemon' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          🎒 Pokemon
        </button>
        <button
          onClick={() => setTab('tasks')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === 'tasks' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          📋 Taches
        </button>
      </div>

      {tab === 'tasks' ? (
        <TaskList tasks={collection.tasks} />
      ) : (
        <>
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            <FilterChip label="Tous" active={filter === 'all'} onClick={() => setFilter('all')} />
            <FilterChip label="✨ Shiny" active={filter === 'shiny'} onClick={() => setFilter('shiny')} />
            {ALL_CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <FilterChip
                  key={cat}
                  label={`${meta.emoji} ${meta.label}`}
                  active={filter === cat}
                  onClick={() => setFilter(cat)}
                />
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex gap-2 text-xs">
            <SortChip label="Recent" active={sort === 'recent'} onClick={() => setSort('recent')} />
            <SortChip label="Rarete" active={sort === 'rarity'} onClick={() => setSort('rarity')} />
            <SortChip label="Niveau" active={sort === 'level'} onClick={() => setSort('level')} />
            <SortChip label="A-Z" active={sort === 'name'} onClick={() => setSort('name')} />
          </div>

          {/* Grid */}
          {sorted.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-4xl mb-3">🎒</p>
              <p className="font-medium">Pas encore de Pokemon ici</p>
              <p className="text-sm mt-1">Complete un pomodoro pour en capturer !</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              <AnimatePresence>
                {sorted.map((pokemon, i) => (
                  <CollectionCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    index={i}
                    isInRoster={rosterIds.has(pokemon.id)}
                    onAssignToRoster={onAssignToRoster}
                    onEvolve={onEvolve}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
        active
          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
          : 'bg-slate-800/60 text-slate-400 border border-slate-700/30 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function SortChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-lg text-xs transition-all ${
        active ? 'text-white bg-slate-700' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      {label}
    </button>
  );
}
