import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import { Goal24, ReadingTimeDuotone } from '@components/common/Icon';
import { TimerCounter } from '@frontend/components/page/focus/SessionPanel/TimerSession/Shared/TimerCounter';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { useTaskStore, TaskStatus } from '@hooks/stores/useTaskStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import ToolPanel from './ToolPanel';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

interface Props {
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const QuickStatusPanel = ({ timer }: Props) => {
  const { isTimerOpen, isGoalOpen, setIsTimerOpen, setIsGoalOpen } =
    useUIStateStore();

  const { taskList } = useTaskStore();
  const { getLabel } = useLanguage();

  const toolList = [
    {
      title: 'Timer',
      icon: ReadingTimeDuotone,
      handler: () => setIsTimerOpen(!isTimerOpen)
    },
    {
      title: 'Goal',
      icon: Goal24,
      handler: () => setIsGoalOpen(!isGoalOpen)
    }
  ];

  const completedTask = taskList.filter(
    (task) => task.status === TaskStatus.COMPLETED
  ).length;

  return (
    <div className="flex items-center justify-center gap-2 text-white z-[999]">
      <ToolPanel
        toolList={toolList}
        className="flex items-center justify-center gap-2 sm:hidden"
        toolItemStyle="bg-black"
      />

      <div className="hidden gap-2 sm:flex">
        <Card
          className="px-3 py-2 cursor-pointer bg-black/85"
          onClick={() => {
            setIsTimerOpen(!isTimerOpen);
          }}
        >
          <CardHeader>
            <Label
              className="text-xs font-bold text-white select-none"
              icon={<ReadingTimeDuotone />}
            >
              {getLabel('lbl_focus_001')}
            </Label>
          </CardHeader>
          <CardContent>
            <TimerCounter
              timer={timer}
              className="text-xs font-semibold select-none"
            />
          </CardContent>
        </Card>

        <Card
          className="flex flex-col items-center justify-center px-3 py-2 cursor-pointer bg-black/85"
          onClick={() => setIsGoalOpen(!isGoalOpen)}
        >
          <CardHeader>
            <Label
              className="text-xs font-bold text-white select-none"
              icon={<Goal24 />}
            >
              {getLabel('lbl_focus_002')}
            </Label>
          </CardHeader>
          <CardContent className="text-xs font-semibold select-none">
            <span className="font-bold">{completedTask}</span>/{taskList.length}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
