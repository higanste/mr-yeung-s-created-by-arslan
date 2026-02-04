import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: (seconds: number) => void;
}

export const useTimer = (onTick?: (timeLeft: number) => void, onFinish?: () => void): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback((seconds: number) => {
    clearTimer();
    setTimeLeft(seconds);
    setIsRunning(true);
    setIsPaused(false);
    setIsFinished(false);
  }, [clearTimer]);

  const pause = useCallback(() => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  }, [isRunning, isPaused]);

  const resume = useCallback(() => {
    if (isRunning && isPaused) {
      setIsPaused(false);
    }
  }, [isRunning, isPaused]);

  const stop = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setIsPaused(false);
  }, [clearTimer]);

  const reset = useCallback((seconds: number) => {
    clearTimer();
    setTimeLeft(seconds);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
  }, [clearTimer]);

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          onTick?.(newTime);
          
          if (newTime <= 0) {
            setIsRunning(false);
            setIsFinished(true);
            onFinish?.();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return clearTimer;
  }, [isRunning, isPaused, timeLeft, onTick, onFinish, clearTimer]);

  return {
    timeLeft,
    isRunning,
    isPaused,
    isFinished,
    start,
    pause,
    resume,
    stop,
    reset,
  };
};
