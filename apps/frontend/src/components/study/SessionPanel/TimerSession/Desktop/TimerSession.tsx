import {
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded,
  Pause,
  Play,
} from '@components/common/Icon';
import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import StudyToolbar from '@components/study/StudyToolbar';
import { Button } from '@components/common/Button';
import { TimerCounter } from '../Shared/TimerCounter';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from '../Shared/TimerDetail';

type TimerSessionProps = {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
};

export const TimerSession = ({ className, timer }: TimerSessionProps) => {
  const { isTimerOpen, setIsTimerOpen, isTimerDetail, setIsTimerDetail } =
    useUIStateStore();

  const toolBarList = [
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
        <CardContent className="justify-between">
          <TimerCounter
            className="text-3xl font-extrabold text-white"
            timer={timer}
          />
          <div>
            <Button
              className="hover:bg-slate-600"
              onClick={() => {
                setIsTimerDetail(true);
                timer.pause();
              }}
            >
              <SquareRounded className="text-white" />
            </Button>
            <Button
              className=" hover:bg-slate-600"
              onClick={() => (timer.isRunning ? timer.pause() : timer.start())}
            >
              {timer.isRunning ? (
                <Pause className="text-white" />
              ) : (
                <Play className="text-white"></Play>
              )}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
