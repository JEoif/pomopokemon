interface TimerCircleProps {
  secondsRemaining: number;
  totalSeconds: number;
  isWork: boolean;
}

export function TimerCircle({ secondsRemaining, totalSeconds, isWork }: TimerCircleProps) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = secondsRemaining / totalSeconds;
  const offset = circumference * (1 - progress);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const strokeColor = isWork ? '#f85888' : '#22c55e';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="280" height="280" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold text-white font-mono tabular-nums tracking-tight">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-sm text-slate-400 mt-2 uppercase tracking-widest">
          {isWork ? 'Focus' : 'Pause'}
        </span>
      </div>
    </div>
  );
}
