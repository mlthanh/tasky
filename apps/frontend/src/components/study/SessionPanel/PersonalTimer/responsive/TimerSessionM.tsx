import { Card, CardContent, CardHeader } from '@common/Card';
import { Label } from '@common/Label';
import { TimerCounter } from '../TimerCounter';
import { Button } from '@common/Button';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import {
  Pause,
  Play,
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded,
} from '@common/Icon';
import StudyToolbar from '@components/study/StudyToolbar';

interface TimerSessionMProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

const TimerSessionM = ({ className, timer }: TimerSessionMProps) => {
  const { isTimerOpen, setIsTimerOpen, setIsTimerDetail } = useUIStateStore();

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
        <Label className="text-white" icon={<ReadingTimeDuotone />}>
          Personal Timer
        </Label>
        <StudyToolbar toolBarList={toolBarList} />
      </CardHeader>
      <CardContent className="flex justify-between">
        <TimerCounter
          className="text-3xl font-extrabold text-white"
          timer={timer}
        />
        <div className="flex gap-3">
          <Button
            className="p-0 "
            onClick={() => {
              setIsTimerDetail(true);
              timer.pause();
            }}
          >
            <SquareRounded className="text-white " />
          </Button>
          <Button
            className="p-0"
            onClick={() => (timer.isRunning ? timer.pause() : timer.start())}
          >
            {timer.isRunning ? (
              <Pause className="text-white " />
            ) : (
              <Play className="text-white "></Play>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerSessionM;
