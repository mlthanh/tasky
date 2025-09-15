import { Card, CardContent, CardHeader } from '@components/common/Card';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import { Label } from '@components/common/Label';
import StudyToolbar from '@frontend/components/page/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { Modal } from '@components/common/Modal';
import GoalSetting from '../Shared/GoalSetting';
import { GoalList } from '../Shared/GoalList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export const GoalModal = () => {
  const { setIsGoalOpen, isGoalOpen } = useUIStateStore();
  const { getLabel } = useLanguage();

  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose className="text-black" />,
      handler: () => {
        setIsGoalOpen(!isGoalOpen);
      }
    }
  ];

  return (
    <Modal isOpen={isGoalOpen}>
      <Card>
        <CardHeader className="flex justify-between">
          <div className="flex items-center justify-center gap-1">
            <Label className="text-black " icon={<ReadingTimeDuotone />}>
              {getLabel('lbl_study_002')}
            </Label>
          </div>
          <StudyToolbar toolBarList={toolBarList} />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full gap-4 ">
          <GoalSetting className="text-white" />
          <GoalList className="text-white max-h-[230px]" />
        </CardContent>
      </Card>
    </Modal>
  );
};
