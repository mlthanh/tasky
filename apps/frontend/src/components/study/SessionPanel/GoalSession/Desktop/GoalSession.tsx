import { Card, CardContent, CardHeader } from '@common/Card';
import GoalSetting from '../Shared/GoalSetting';
import { Label } from '@common/Label';
import { ReadingTimeDuotone, RoundClose } from '@common/Icon';
import StudyToolbar from '../../../StudyToolbar';
import { GoalList } from '../Shared/GoalList';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';

type GoalSessionProps = {
  className?: string;
};

export const GoalSession = ({ className }: GoalSessionProps) => {
  const { isGoalOpen, setIsGoalOpen, isTimerOpen, isTimerDetail } =
    useUIStateStore();
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
    <Card className={className}>
      <CardHeader className="flex justify-between">
        <div className="flex items-center justify-center gap-1">
          <Label className="text-white" icon={<ReadingTimeDuotone />}>
            Session goals
          </Label>
        </div>
        <StudyToolbar toolBarList={toolBarList}></StudyToolbar>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full gap-4 text-white">
        <GoalSetting className="flex flex-col items-center justify-center w-full gap-2" />
        <GoalList
          className={`flex flex-col items-center justify-start w-full gap-2 overflow-y-auto pr-1 ${
            isTimerOpen ? 'sm:max-h-[110px] xl:max-h-[180px]' : 'max-h-[400px]'
          }`}
        />
      </CardContent>
    </Card>
  );
};
