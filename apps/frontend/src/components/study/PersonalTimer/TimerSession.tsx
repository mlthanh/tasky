import {
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded,
  Pause,
  Play,
} from '@common/Icon';
import { Card, CardContent, CardFooter, CardHeader } from '@common/Card';
import { Label } from '@common/Label';
import StudyToolbar from '../StudyToolbar';
import TimerSetting, { TimerConfigRef } from './TimerSetting';
import { Button } from '@common/Button';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { useRef, useState } from 'react';
import { TimerCounter } from './TimerCounter';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';

type TimerSessionProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

const TimerSession = ({ className, timer }: TimerSessionProps) => {
  const fTimerRef = useRef<TimerConfigRef>(null);
  const bTimerRef = useRef<TimerConfigRef>(null);

  const [isSetting, setIsSetting] = useState(true);
  const { bTime, fTime, setfocusTime, setbreakTime } = useTimeStore();
  const { isTimerOpen, setIsTimerOpen } = useUIStateStore();

  const toolBarList = [
    {
      title: 'infor',
      icon: <ReadingTimeDuotone />,
      handler: () => {
        console.log('Infor');
      },
    },
    {
      title: 'close',
      icon: <RoundClose />,
      handler: () => {
        setIsTimerOpen(!isTimerOpen);
      },
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<ReadingTimeDuotone />}>
            Personal Timer
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList} />
      </CardHeader>

      {isSetting ? (
        <>
          <CardContent className="flex flex-col items-center justify-center gap-2 text-white">
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

                  setIsSetting(false);
                  timer.reset();
                  timer.start();
                }
              }}
            >
              Set time
            </Button>
          </CardFooter>
        </>
      ) : (
        <div className="w-full">
          <CardContent className="justify-between">
            <TimerCounter
              className="text-3xl font-extrabold text-white"
              timer={timer}
            />
            <div className="">
              <Button
                className=" hover:bg-slate-600"
                onClick={() => {
                  setIsSetting(true);
                  timer.pause();
                }}
              >
                <SquareRounded classname="text-white" />
              </Button>
              <Button
                className=" hover:bg-slate-600"
                onClick={() =>
                  timer.isRunning ? timer.pause() : timer.start()
                }
              >
                {timer.isRunning ? (
                  <Pause classname="text-white" />
                ) : (
                  <Play classname="text-white"></Play>
                )}
              </Button>
            </div>
          </CardContent>
        </div>
      )}
    </Card>
  );
};

export default TimerSession;
