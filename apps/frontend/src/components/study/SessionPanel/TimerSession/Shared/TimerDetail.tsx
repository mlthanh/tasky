import { useRef } from 'react';
import { CardContent, CardFooter } from '@components/common/Card';
import { Button } from '@components/common/Button';
import { TimerConfigRef, TimerSetting } from './TimerSetting';
import { useTimeStore, useUIStateStore, useDeviceStore } from '@hooks/stores';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { tailwindMerge } from '@utils/merge';

type TimerDetailProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

const TimerDetail = ({ className, timer }: TimerDetailProps) => {
  const fTimerRef = useRef<TimerConfigRef>(null);
  const bTimerRef = useRef<TimerConfigRef>(null);

  const { bTime, fTime, setfocusTime, setbreakTime } = useTimeStore();
  const { setIsTimerDetail } = useUIStateStore();
  const { isMobile } = useDeviceStore();

  return (
    <>
      <CardContent
        className={tailwindMerge(
          'flex flex-col items-center justify-center gap-2 sm:text-white text-black',
          className
        )}
      >
        <span>Focus time (min)</span>
        <TimerSetting
          ref={fTimerRef}
          step={5}
          className="text-4xl font-extrabold lg:text-3xl sm:text-2xl"
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
          className="text-4xl font-extrabold lg:text-3xl sm:text-2xl"
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
                setIsTimerDetail(false);
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
