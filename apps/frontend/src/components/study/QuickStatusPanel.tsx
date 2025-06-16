// components/study/QuickStatusPanel.tsx
import { Card, CardContent, CardHeader } from '@components/common/Card';
import { Label } from '@components/common/Label';
import { Goal24, ReadingTimeDuotone } from '@components/common/Icon';
import { TimerCounter } from '@components/study/SessionPanel/TimerSession/Shared/TimerCounter';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { useTaskStore, TaskStatus } from '@hooks/stores/useTaskStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import ToolPanel from './ToolPanel';

interface Props {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const QuickStatusPanel = ({ className = '', timer }: Props) => {
  const { isTimerOpen, isGoalOpen, setIsTimerOpen, setIsGoalOpen } =
    useUIStateStore();

  const { taskList } = useTaskStore();

  const toolList = [
    {
      title: 'Timer',
      icon: ReadingTimeDuotone,
      handler: () => setIsTimerOpen(!isTimerOpen),
    },
    {
      title: 'Goal',
      icon: Goal24,
      handler: () => setIsGoalOpen(!isGoalOpen),
    },
  ];

  const completedTask = taskList.filter(
    (task) => task.status === TaskStatus.COMPLETED
  ).length;
  const openTask = taskList.filter(
    (task) => task.status === TaskStatus.OPEN
  ).length;

  return (
    <div
      className={`flex items-center justify-center gap-2 text-white ${className}`}
    >
      <ToolPanel
        toolList={toolList}
        className="flex items-center justify-center gap-2 sm:hidden"
        classNameButton="bg-black"
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
              className="text-xs text-white select-none"
              icon={<ReadingTimeDuotone />}
            >
              Personal Timer
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
            <Label className="text-xs text-white select-none" icon={<Goal24 />}>
              Goal Sessions
            </Label>
          </CardHeader>
          <CardContent className="text-xs font-semibold select-none">
            <span className="font-bold">{completedTask}</span>/{openTask}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
