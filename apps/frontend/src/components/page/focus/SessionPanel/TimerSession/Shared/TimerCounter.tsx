import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { tailwindMerge } from '@utils/merge';

type TimerCounterProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

export const TimerCounter = ({ className, timer }: TimerCounterProps) => {
  const { timeLeft } = timer;

  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div
      className={tailwindMerge(
        'text-center text-white relative inline-block',
        className
      )}
    >
      <span className="invisible">88:88:88</span>
      <span className="absolute top-0 left-0 w-full h-full text-center">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};
