import { Card, CardHeader } from '@common/Card';
import { ReadingTimeDuotone, RoundClose } from '@common/Icon';
import { Label } from '@common/Label';
import StudyToolbar from '@components/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from '../TimerDetail';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';

interface TimerModalProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

const TimerModal = ({ className, timer }: TimerModalProps) => {
  const { isTimerOpen, setIsTimerOpen } = useUIStateStore();

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
      <TimerDetail timer={timer} />
    </Card>
  );
};

export default TimerModal;
