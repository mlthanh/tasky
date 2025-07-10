import { useEffect, useRef, useState } from 'react';

export type TimerMode = 'focus' | 'break';

export const usePomodoroTimer = ({
  focusTime = 25 * 60,
  breakTime = 5 * 60,
  autoLoop = false
} = {}) => {
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [mode, setMode] = useState<TimerMode>('focus');
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(focusTime);
  };

  useEffect(() => {
    setTimeLeft(mode === 'focus' ? focusTime : breakTime);
  }, [focusTime, breakTime, mode]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === 'focus' ? 'break' : 'focus';
          setMode(nextMode);

          if (!autoLoop) {
            setIsRunning(false);
          }

          return nextMode === 'focus' ? focusTime : breakTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, mode, autoLoop, focusTime, breakTime]);

  return {
    timeLeft,
    isRunning,
    mode,
    start,
    pause,
    reset
  };
};
