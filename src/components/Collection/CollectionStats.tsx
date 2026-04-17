import type { CollectionState } from '../../types';

interface CollectionStatsProps {
  stats: CollectionState['stats'];
  uniqueCount: number;
  shinyCount: number;
  totalCaught: number;
}

export function CollectionStats({ stats, uniqueCount, shinyCount, totalCaught }: CollectionStatsProps) {
  const hours = Math.floor(stats.totalMinutesFocused / 60);
  const mins = stats.totalMinutesFocused % 60;

  return (
    <div className="grid grid-cols-4 gap-2">
      <StatBox label="Captures" value={String(totalCaught)} icon="🎯" />
      <StatBox label="Uniques" value={String(uniqueCount)} icon="📋" />
      <StatBox label="Shiny" value={String(shinyCount)} icon="✨" />
      <StatBox
        label="Focus"
        value={hours > 0 ? `${hours}h${mins > 0 ? mins : ''}` : `${mins}m`}
        icon="⏱"
      />
    </div>
  );
}

function StatBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-slate-800/60 rounded-xl p-3 flex flex-col items-center gap-1 border border-slate-700/30">
      <span className="text-lg">{icon}</span>
      <span className="text-lg font-bold text-white">{value}</span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}
