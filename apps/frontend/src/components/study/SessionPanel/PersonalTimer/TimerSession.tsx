import {
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded,
  Pause,
  Play,
} from '@common/Icon';
import { Card, CardContent, CardFooter, CardHeader } from '@common/Card';
import { Label } from '@common/Label';
import StudyToolbar from '../../StudyToolbar';
import TimerSetting, { TimerConfigRef } from './TimerSetting';
import { Button } from '@common/Button';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { useRef, useState } from 'react';
import { TimerCounter } from './TimerCounter';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from './TimerDetail';

type TimerSessionProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

const TimerSession = ({ className, timer }: TimerSessionProps) => {
  const { isTimerOpen, setIsTimerOpen, isTimerDetail, setIsTimerDetail } =
    useUIStateStore();

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

      {isTimerDetail ? (
        <TimerDetail timer={timer} />
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
                  setIsTimerDetail(true);
                  timer.pause();
                }}
              >
                <SquareRounded className="text-white" />
              </Button>
              <Button
                className=" hover:bg-slate-600"
                onClick={() =>
                  timer.isRunning ? timer.pause() : timer.start()
                }
              >
                {timer.isRunning ? (
                  <Pause className="text-white" />
                ) : (
                  <Play className="text-white"></Play>
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
