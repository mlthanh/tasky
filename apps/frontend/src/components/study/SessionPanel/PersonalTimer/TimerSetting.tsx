import { tailwindMerge } from '@utils/merge';
import { useImperativeHandle, useState } from 'react';

type TimerProps = {
  initialHour: number;
  initialMinute: number;
  maxHours?: number;
  step?: number;
  className?: string;
  ref?: React.Ref<TimerConfigRef>;
};

export interface TimerConfigRef {
  getTimes: () => number;
}

function TimerSetting({
  initialMinute,
  initialHour,
  maxHours = 2,
  step = 1,
  className,
  ref,
}: TimerProps) {
  const [hours, setHours] = useState(initialHour);
  const [minutes, setMinutes] = useState(initialMinute);

  useImperativeHandle(ref, () => ({
    getTimes: () => hours * 3600 + minutes * 60,
  }));

  return (
    <div
      className={tailwindMerge(
        'flex items-center justify-between w-full',
        className
      )}
    >
      <button
        onClick={() => {
          if (minutes >= 59 && hours < maxHours) {
            setHours((prev) => prev + 1);
            setMinutes(0);
          } else {
            setMinutes((prev) => prev + step);
          }
        }}
      >
        +
      </button>
      <h1>
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:00
      </h1>
      <button
        onClick={() => {
          if (minutes === 0 && hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(60 - step);
          } else if (minutes > 5) {
            setMinutes((prev) => prev - step);
          }
        }}
      >
        -
      </button>
    </div>
  );
}

export default TimerSetting;
