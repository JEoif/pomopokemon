import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { detectCategory, CATEGORY_META } from '../../lib/taskDetector';
import { DurationPicker } from '../Timer/DurationPicker';
import type { CategoryId, TaskEntry, TimerDuration } from '../../types';

interface TaskInputProps {
  onStart: (taskName: string, category: CategoryId, duration: TimerDuration) => void;
  recentTasks: TaskEntry[];
  defaultDuration: TimerDuration;
  onDurationChange: (d: TimerDuration) => void;
}

export function TaskInput({ onStart, recentTasks, defaultDuration, onDurationChange }: TaskInputProps) {
  const [text, setText] = useState('');

  const detectedCategory = useMemo(() => {
    if (text.trim().length < 2) return null;
    return detectCategory(text);
  }, [text]);

  const meta = detectedCategory ? CATEGORY_META[detectedCategory] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed.length < 2) return;
    onStart(trimmed, detectedCategory || 'other', defaultDuration);
  };

  const handleQuickStart = (task: TaskEntry) => {
    onStart(task.name, task.category, defaultDuration);
  };

  // Show up to 5 most recent tasks
  const recent = useMemo(() => {
    return Object.values(recentTasks)
      .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
      .slice(0, 5);
  }, [recentTasks]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">C'est parti !</h2>
        <p className="text-slate-400 text-sm">
          Dis-moi ce que tu vas faire
        </p>
      </div>

      {/* Duration picker */}
      <DurationPicker value={defaultDuration} onChange={onDurationChange} />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex: Sport, Faire les impots, Ecrire..."
            autoFocus
            className="w-full px-5 py-4 rounded-2xl bg-slate-800/80 border border-slate-700/50 text-white placeholder-slate-500 text-base outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all"
          />

          {/* Auto-detected category badge */}
          {meta && text.trim().length >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-white/80"
              style={{ background: meta.gradient }}
            >
              <span>{meta.emoji}</span>
              <span>{meta.label}</span>
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          disabled={text.trim().length < 2}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold text-base transition-all active:scale-[0.98] shadow-lg shadow-pink-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Lancer le Pomodoro 🍅
        </button>
      </form>

      {/* Recent tasks */}
      {recent.length > 0 && (
        <div className="w-full">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-1">
            Taches recentes
          </p>
          <div className="flex flex-col gap-1.5">
            {recent.map((task) => {
              const taskMeta = CATEGORY_META[task.category];
              const hours = Math.floor(task.totalMinutes / 60);
              const mins = task.totalMinutes % 60;
              const timeStr = hours > 0 ? `${hours}h${mins > 0 ? String(mins).padStart(2, '0') : ''}` : `${mins}m`;

              return (
                <button
                  key={task.name}
                  onClick={() => handleQuickStart(task)}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/20 hover:bg-slate-700/40 transition-all text-left group"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: taskMeta.gradient }}
                  >
                    {taskMeta.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate group-hover:text-pink-300 transition-colors">
                      {task.name}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {task.pomodoroCount} pomo · {timeStr}
                    </p>
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-400 text-xs">▶</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
