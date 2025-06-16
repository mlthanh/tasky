import { Card, CardContent, CardHeader } from '@components/common/Card';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import { Label } from '@components/common/Label';
import StudyToolbar from '@components/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { Modal } from '@components/common/Modal';
import GoalSetting from '../Shared/GoalSetting';
import { GoalList } from '../Shared/GoalList';

interface GoalModalProps {
  className?: string;
}

export const GoalModal = ({ className }: GoalModalProps) => {
  const { setIsGoalOpen, isGoalOpen } = useUIStateStore();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: () => {
        setIsGoalOpen(!isGoalOpen);
      },
    },
  ];

  return (
    <Modal isOpen={isGoalOpen}>
      <Card className={className}>
        <CardHeader className="flex justify-between">
          <div className="flex items-center justify-center gap-1">
            <Label
              className="text-black sm:text-white"
              icon={<ReadingTimeDuotone />}
            >
              Goal Session
            </Label>
          </div>
          <StudyToolbar toolBarList={toolBarList} />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full gap-4 ">
          <GoalSetting className="flex flex-col items-center justify-center w-full gap-2 text-white" />
          <GoalList
            className={`flex flex-col items-center justify-start w-full gap-2 overflow-y-auto pr-1 text-white max-h-[230px]`}
          />
        </CardContent>
      </Card>
    </Modal>
  );
};
