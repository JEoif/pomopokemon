import { DURATION_OPTIONS } from '../../types';
import type { TimerDuration } from '../../types';

interface DurationPickerProps {
  value: TimerDuration;
  onChange: (duration: TimerDuration) => void;
}

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-slate-500 uppercase tracking-wider">Duree du pomodoro</p>
      <div className="flex gap-2">
        {DURATION_OPTIONS.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                active
                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/40 shadow-sm shadow-pink-500/10'
                  : 'bg-slate-800/60 text-slate-400 border-slate-700/30 hover:text-white hover:border-slate-600'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-600">
        Pause : {DURATION_OPTIONS.find((o) => o.value === value)?.breakSeconds
          ? Math.round((DURATION_OPTIONS.find((o) => o.value === value)!.breakSeconds) / 60) + ' min'
          : '5 min'}
      </p>
    </div>
  );
}
