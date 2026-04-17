import { TimerCircle } from './TimerCircle';

interface TimerProps {
  secondsRemaining: number;
  totalSeconds: number;
  isRunning: boolean;
  phase: 'work' | 'break';
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export function Timer({
  secondsRemaining,
  totalSeconds,
  isRunning,
  phase,
  onPause,
  onResume,
  onReset,
}: TimerProps) {
  return (
    <div className="flex flex-col items-center gap-8">
      <TimerCircle
        secondsRemaining={secondsRemaining}
        totalSeconds={totalSeconds}
        isWork={phase === 'work'}
      />

      <div className="flex gap-4">
        {isRunning ? (
          <button
            onClick={onPause}
            className="px-8 py-3 rounded-2xl bg-slate-700/60 hover:bg-slate-600/60 text-white font-medium text-lg transition-all active:scale-95 backdrop-blur-sm border border-slate-600/30"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-medium text-lg transition-all active:scale-95 shadow-lg shadow-pink-500/20"
          >
            ▶ Reprendre
          </button>
        )}
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-2xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-400 hover:text-white font-medium transition-all active:scale-95 border border-slate-700/30"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
