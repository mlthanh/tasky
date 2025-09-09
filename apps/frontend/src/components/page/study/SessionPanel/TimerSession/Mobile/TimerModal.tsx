import { Card, CardHeader } from '@components/common/Card';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import { Label } from '@components/common/Label';
import StudyToolbar from '@frontend/components/page/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import TimerDetail from '../Shared/TimerDetail';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { Modal } from '@components/common/Modal';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

interface TimerModalProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const TimerModal = ({ className, timer }: TimerModalProps) => {
  const { setIsTimerDetail, isTimerOpen, isTimerDetail } = useUIStateStore();
  const { isMobile } = useDeviceStore();
  const { getLabel } = useLanguage();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose className="text-black" />,
      handler: () => {
        setIsTimerDetail(false);
      }
    }
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
              {getLabel('lbl_study_001')}
            </Label>
          </div>
          <StudyToolbar toolBarList={toolBarList} />
        </CardHeader>
        <TimerDetail timer={timer} />
      </Card>
    </Modal>
  );
};
