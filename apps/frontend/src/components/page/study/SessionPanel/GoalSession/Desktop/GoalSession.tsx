import { Card, CardContent, CardHeader } from '@components/common/Card';
import GoalSetting from '../Shared/GoalSetting';
import { Label } from '@components/common/Label';
import { ReadingTimeDuotone, RoundClose } from '@components/common/Icon';
import StudyToolbar from '@frontend/components/page/study/StudyToolbar';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { GoalList } from '../Shared/GoalList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export const GoalSession = () => {
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
    <Card className="px-4 py-3 text-sm bg-black/85">
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<ReadingTimeDuotone />}>
            {getLabel('lbl_study_002')}
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full gap-4 text-white">
        <GoalSetting />
        <GoalList
          className={`${
            isTimerOpen ? 'sm:max-h-[110px] xl:max-h-[140px]' : 'max-h-[400px]'
          }`}
        />
      </CardContent>
    </Card>
  );
};
