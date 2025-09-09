import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import { TimerCounter } from '../Shared/TimerCounter';
import { Button } from '@components/common/Button';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import {
  Pause,
  Play,
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded
} from '@components/common/Icon';
import StudyToolbar from '@frontend/components/page/study/StudyToolbar';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

interface TimerSessionMProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const TimerSessionM = ({ className, timer }: TimerSessionMProps) => {
  const { isTimerOpen, setIsTimerOpen, setIsTimerDetail } = useUIStateStore();
  const { getLabel } = useLanguage();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose className="text-white" />,
      handler: () => {
        setIsTimerOpen(!isTimerOpen);
      }
    }
  ];

  return (
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <Label className="text-white" icon={<ReadingTimeDuotone />}>
          {getLabel('lbl_study_001')}
        </Label>
        <StudyToolbar toolBarList={toolBarList} />
      </CardHeader>
      <CardContent className="flex justify-between gap-4">
        <TimerCounter
          className="text-4xl font-extrabold text-white sm:text-2xl"
          timer={timer}
        />
        <div className="flex gap-3">
          <Button
            variant={'ghost'}
            className="text-white"
            onClick={() => {
              setIsTimerDetail(true);
              timer.pause();
            }}
          >
            <SquareRounded className="w-6 h-6 " />
          </Button>
          <Button
            variant={'ghost'}
            className="text-white"
            onClick={() => (timer.isRunning ? timer.pause() : timer.start())}
          >
            {timer.isRunning ? (
              <Pause className="w-6 h-6 " />
            ) : (
              <Play className="w-6 h-6 "></Play>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
