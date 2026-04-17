import { useMemo } from 'react';
import { CATEGORY_META } from '../../lib/taskDetector';
import type { TaskEntry } from '../../types';

interface TaskListProps {
  tasks: Record<string, TaskEntry>;
}

type SortBy = 'recent' | 'time' | 'count';

import { useState } from 'react';

export function TaskList({ tasks }: TaskListProps) {
  const [sortBy, setSortBy] = useState<SortBy>('recent');

  const sortedTasks = useMemo(() => {
    const entries = Object.values(tasks);
    switch (sortBy) {
      case 'time':
        return entries.sort((a, b) => b.totalMinutes - a.totalMinutes);
      case 'count':
        return entries.sort((a, b) => b.pomodoroCount - a.pomodoroCount);
      case 'recent':
      default:
        return entries.sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime());
    }
  }, [tasks, sortBy]);

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        <p className="text-4xl mb-3">📋</p>
        <p className="font-medium">Aucune tache enregistree</p>
        <p className="text-sm mt-1">Lance ton premier pomodoro !</p>
      </div>
    );
  }

  // Total time across all tasks
  const totalMinutes = sortedTasks.reduce((sum, t) => sum + t.totalMinutes, 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;

  return (
    <div className="flex flex-col gap-3">
      {/* Total banner */}
      <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4 text-center">
        <p className="text-2xl font-bold text-white">
          {totalHours > 0 ? `${totalHours}h${totalMins > 0 ? String(totalMins).padStart(2, '0') : ''}` : `${totalMins}m`}
        </p>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
          Temps total de focus
        </p>
      </div>

      {/* Sort */}
      <div className="flex gap-2 text-xs">
        <SortBtn label="Recent" active={sortBy === 'recent'} onClick={() => setSortBy('recent')} />
        <SortBtn label="Temps" active={sortBy === 'time'} onClick={() => setSortBy('time')} />
        <SortBtn label="Pomodoros" active={sortBy === 'count'} onClick={() => setSortBy('count')} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {sortedTasks.map((task) => {
          const meta = CATEGORY_META[task.category];
          const hours = Math.floor(task.totalMinutes / 60);
          const mins = task.totalMinutes % 60;
          const timeStr = hours > 0 ? `${hours}h${mins > 0 ? String(mins).padStart(2, '0') : ''}` : `${mins}m`;

          // Progress bar width relative to max task
          const maxMinutes = Math.max(...sortedTasks.map((t) => t.totalMinutes));
          const pct = (task.totalMinutes / maxMinutes) * 100;

          return (
            <div
              key={task.name}
              className="relative bg-slate-800/40 border border-slate-700/20 rounded-xl p-3 overflow-hidden"
            >
              {/* Progress bar background */}
              <div
                className="absolute inset-y-0 left-0 opacity-10 rounded-xl"
                style={{
                  width: `${pct}%`,
                  background: meta.gradient,
                }}
              />

              <div className="relative flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: meta.gradient }}
                >
                  {meta.emoji}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {task.name}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {task.pomodoroCount} pomodoro{task.pomodoroCount > 1 ? 's' : ''}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-base font-bold text-white">{timeStr}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SortBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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
