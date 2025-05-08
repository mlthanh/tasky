import { CardContent, CardFooter } from '@common/Card';
import TimerSetting, { TimerConfigRef } from './TimerSetting';
import { Button } from '@common/Button';
import { useRef, useState } from 'react';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { tailwindMerge } from '@utils/merge';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';

type TimerDetailProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

const TimerDetail = ({ className, timer }: TimerDetailProps) => {
  const fTimerRef = useRef<TimerConfigRef>(null);
  const bTimerRef = useRef<TimerConfigRef>(null);

  const { bTime, fTime, setfocusTime, setbreakTime } = useTimeStore();
  const { setIsTimerOpen, isTimerOpen, setIsTimerDetail } = useUIStateStore();
  const { isMobile } = useDeviceStore();

  return (
    <>
      <CardContent
        className={tailwindMerge(
          `flex flex-col items-center justify-center gap-2 text-white`,
          className
        )}
      >
        <span>Focus time (min)</span>
        <TimerSetting
          ref={fTimerRef}
          step={5}
          className="text-4xl font-extrabold"
          initialMinute={Math.floor((fTime % 3600) / 60)}
          initialHour={Math.floor(fTime / 3600)}
        />
        <span>Break time (min)</span>
        <TimerSetting
          ref={bTimerRef}
          step={1}
          maxHours={0}
          initialMinute={Math.floor((bTime % 3600) / 60)}
          initialHour={Math.floor(bTime / 3600)}
          className="text-4xl font-extrabold"
        />
      </CardContent>
      <CardFooter className="w-full my-1 ">
        <Button
          className="w-full rounded-lg bg-primary"
          onClick={() => {
            if (bTimerRef.current && fTimerRef.current) {
              setfocusTime(fTimerRef.current.getTimes());
              setbreakTime(bTimerRef.current.getTimes());

              if (isMobile) {
                setIsTimerOpen(false);
              }
              setIsTimerDetail(false);
              timer.reset();
              timer.start();
            }
          }}
        >
          Set time
        </Button>
      </CardFooter>
    </>
  );
};

export default TimerDetail;
