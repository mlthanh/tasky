import {
  ReadingTimeDuotone,
  RoundClose,
  SquareRounded,
  Pause,
  Play
} from '@components/common/Icon';
import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import FocusToolbar from '@frontend/components/page/focus/FocusToolbar';
import { Button } from '@components/common/Button';
import { TimerCounter } from '../Shared/TimerCounter';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from '../Shared/TimerDetail';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

type TimerSessionProps = {
  timer: ReturnType<typeof usePomodoroTimer>;
};

export const TimerSession = ({ timer }: TimerSessionProps) => {
  const { isTimerOpen, setIsTimerOpen, isTimerDetail, setIsTimerDetail } =
    useUIStateStore();
  const { getLabel } = useLanguage();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: () => {
        setIsTimerOpen(!isTimerOpen);
      }
    }
  ];

  return (
    <Card className="h-full px-4 py-3 sm:text-sm bg-black/85">
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="font-bold text-white" icon={<ReadingTimeDuotone />}>
            {getLabel('lbl_focus_001')}
          </Label>
        </div>
        <FocusToolbar toolBarList={toolBarList} />
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
              variant={'ghost'}
              className="text-white"
              onClick={() => {
                setIsTimerDetail(true);
                timer.pause();
              }}
            >
              <SquareRounded className="" />
            </Button>
            <Button
              variant={'ghost'}
              className="text-white"
              onClick={() => (timer.isRunning ? timer.pause() : timer.start())}
            >
              {timer.isRunning ? <Pause /> : <Play></Play>}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
