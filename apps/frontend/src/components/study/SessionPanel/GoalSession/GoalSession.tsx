import { Card, CardContent, CardHeader } from '@common/Card';
import GoalSetting from './GoalSetting';
import { Label } from '@common/Label';
import { ReadingTimeDuotone, RoundClose } from '@common/Icon';
import StudyToolbar from '../../StudyToolbar';
import { GoalList } from './GoalList';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';

type GoalSessionProps = {
  className?: string;
};

export const GoalSession = ({ className }: GoalSessionProps) => {
  const { isGoalOpen, setIsGoalOpen } = useUIStateStore();
  const toolBarList = [
    {
      title: 'infor',
      icon: <ReadingTimeDuotone />,
      handler: () => {
        console.log('Infor');
      },
    },
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

      <CardContent className="flex flex-col items-center justify-center gap-4 text-white">
        <GoalSetting className="flex flex-col items-center justify-center w-full gap-4" />
        <GoalList className="flex flex-col items-center justify-center w-full gap-2" />
      </CardContent>
    </Card>
  );
};
