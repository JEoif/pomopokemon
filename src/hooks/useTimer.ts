import { useState, useRef, useCallback, useEffect } from 'react';
import type { TimerDuration, TimerPhase } from '../types';
import { DURATION_OPTIONS } from '../types';

const DEFAULT_WORK_DURATION: TimerDuration = 1500; // 25 minutes

interface TimerState {
  phase: TimerPhase;
  secondsRemaining: number;
  totalSeconds: number;
  isRunning: boolean;
  duration: TimerDuration; // selected work duration
}

export function useTimer(onWorkComplete: () => void, onBreakComplete: () => void) {
  const [state, setState] = useState<TimerState>({
    phase: 'category',
    secondsRemaining: DEFAULT_WORK_DURATION,
    totalSeconds: DEFAULT_WORK_DURATION,
    isRunning: false,
    duration: DEFAULT_WORK_DURATION,
  });

  const targetEndRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callbacksRef = useRef({ onWorkComplete, onBreakComplete });
  callbacksRef.current = { onWorkComplete, onBreakComplete };

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    targetEndRef.current = null;
  }, []);

  const tick = useCallback(() => {
    if (!targetEndRef.current) return;
    const remaining = Math.max(0, Math.ceil((targetEndRef.current - Date.now()) / 1000));

    setState((prev) => {
      if (remaining <= 0) {
        if (prev.phase === 'work') {
          callbacksRef.current.onWorkComplete();
          return { ...prev, secondsRemaining: 0, isRunning: false };
        } else if (prev.phase === 'break') {
          callbacksRef.current.onBreakComplete();
          return {
            ...prev,
            phase: 'category',
            secondsRemaining: prev.duration,
            totalSeconds: prev.duration,
            isRunning: false,
          };
        }
      }
      return { ...prev, secondsRemaining: remaining };
    });

    if (remaining <= 0) {
      clearTimer();
    }
  }, [clearTimer]);

  // Handle tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && targetEndRef.current) {
        tick();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [tick]);

  const startWork = useCallback((duration: TimerDuration = DEFAULT_WORK_DURATION) => {
    clearTimer();
    targetEndRef.current = Date.now() + duration * 1000;
    setState({
      phase: 'work',
      secondsRemaining: duration,
      totalSeconds: duration,
      isRunning: true,
      duration,
    });
    intervalRef.current = setInterval(tick, 1000);
  }, [clearTimer, tick]);

  const startBreak = useCallback((workDuration: TimerDuration = DEFAULT_WORK_DURATION) => {
    clearTimer();
    // Break duration from DURATION_OPTIONS
    const option = DURATION_OPTIONS.find((o) => o.value === workDuration);
    const breakSeconds = option?.breakSeconds ?? 300;
    targetEndRef.current = Date.now() + breakSeconds * 1000;
    setState((prev) => ({
      ...prev,
      phase: 'break',
      secondsRemaining: breakSeconds,
      totalSeconds: breakSeconds,
      isRunning: true,
    }));
    intervalRef.current = setInterval(tick, 1000);
  }, [clearTimer, tick]);

  const pause = useCallback(() => {
    if (!targetEndRef.current) return;
    const remaining = Math.max(0, targetEndRef.current - Date.now());
    clearTimer();
    setState((prev) => ({
      ...prev,
      secondsRemaining: Math.ceil(remaining / 1000),
      isRunning: false,
    }));
  }, [clearTimer]);

  const resume = useCallback(() => {
    setState((prev) => {
      targetEndRef.current = Date.now() + prev.secondsRemaining * 1000;
      intervalRef.current = setInterval(tick, 1000);
      return { ...prev, isRunning: true };
    });
  }, [tick]);

  const reset = useCallback(() => {
    clearTimer();
    setState((prev) => ({
      phase: 'category',
      secondsRemaining: prev.duration,
      totalSeconds: prev.duration,
      isRunning: false,
      duration: prev.duration,
    }));
  }, [clearTimer]);

  const setDuration = useCallback((duration: TimerDuration) => {
    setState((prev) => ({
      ...prev,
      duration,
      secondsRemaining: duration,
      totalSeconds: duration,
    }));
  }, []);

  const setPhase = useCallback((phase: TimerPhase) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    ...state,
    startWork,
    startBreak,
    pause,
    resume,
    reset,
    setDuration,
    setPhase,
  };
}
