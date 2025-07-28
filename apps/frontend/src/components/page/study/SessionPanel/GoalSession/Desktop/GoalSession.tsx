import { Card, CardContent, CardHeader } from '@components/common/Card';
import GoalSetting from '../Shared/GoalSetting';
import { Label } from '@components/common/Label';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import StudyToolbar from '@frontend/components/page/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { GoalList } from '../Shared/GoalList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

type GoalSessionProps = {
  className?: string;
};

export const GoalSession = ({ className }: GoalSessionProps) => {
  const { isGoalOpen, setIsGoalOpen, isTimerOpen } = useUIStateStore();
  const { getLabel } = useLanguage();
  const toolBarList = [
    {
      title: 'close',
      icon: <RoundClose />,
      handler: () => {
        setIsGoalOpen(!isGoalOpen);
      }
    }
  ];
  return (
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<ReadingTimeDuotone />}>
            {getLabel('goal')}
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full gap-4 text-white">
        <GoalSetting className="flex flex-col items-center justify-center w-full gap-2" />
        <GoalList
          className={`flex flex-col items-center justify-start w-full gap-2 overflow-y-auto pr-1 ${
            isTimerOpen ? 'sm:max-h-[110px] xl:max-h-[140px]' : 'max-h-[400px]'
          }`}
        />
      </CardContent>
    </Card>
  );
};
