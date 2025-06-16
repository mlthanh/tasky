import { Card, CardHeader } from '@components/common/Card';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import { Label } from '@components/common/Label';
import StudyToolbar from '@components/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from '../Shared/TimerDetail';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { Modal } from '@components/common/Modal';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';

interface TimerModalProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const TimerModal = ({ className, timer }: TimerModalProps) => {
  const { setIsTimerDetail, isTimerOpen, isTimerDetail } = useUIStateStore();
  const { isMobile } = useDeviceStore();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: () => {
        setIsTimerDetail(false);
      },
    },
  ];

  return (
    <Modal isOpen={isMobile && isTimerOpen && isTimerDetail}>
      <Card className={className}>
        <CardHeader className="flex justify-between">
          <div className="flex items-center justify-center gap-1">
            <Label
              className="text-black sm:text-white"
              icon={<ReadingTimeDuotone />}
            >
              Personal Timer
            </Label>
          </div>
          <StudyToolbar toolBarList={toolBarList} />
        </CardHeader>
        <TimerDetail timer={timer} />
      </Card>
    </Modal>
  );
};
