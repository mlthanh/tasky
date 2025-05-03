// components/study/QuickStatusPanel.tsx
import { Card, CardContent, CardHeader } from '@common/Card';
import { Label } from '@common/Label';
import { Goal24, ReadingTimeDuotone } from '@common/Icon';
import { TimerCounter } from '@components/study/SessionPanel/PersonalTimer/TimerCounter';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { useTaskStore, TaskStatus } from '@hooks/stores/useTaskStore';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';

interface Props {
  className?: string;
}

export const QuickStatusPanel = ({ className = '' }: Props) => {
  const { isTimerOpen, isGoalOpen, setIsTimerOpen, setIsGoalOpen } =
    useUIStateStore();
  const { fTime, bTime } = useTimeStore();
  const timer = usePomodoroTimer({ focusTime: fTime, breakTime: bTime });
  const { taskList } = useTaskStore();

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
      <Card
        className="px-3 py-2 cursor-pointer bg-black/85"
        onClick={() => setIsTimerOpen(!isTimerOpen)}
      >
        <CardHeader>
          <Label className="text-xs text-white" icon={<ReadingTimeDuotone />}>
            Personal Timer
          </Label>
        </CardHeader>
        <CardContent>
          <TimerCounter timer={timer} className="text-xs font-semibold" />
        </CardContent>
      </Card>

      <Card
        className="flex flex-col items-center justify-center px-3 py-2 cursor-pointer bg-black/85"
        onClick={() => setIsGoalOpen(!isGoalOpen)}
      >
        <CardHeader>
          <Label className="text-xs text-white" icon={<Goal24 />}>
            Goal Sessions
          </Label>
        </CardHeader>
        <CardContent className="text-xs font-semibold">
          <span className="font-bold">{completedTask}</span>/{openTask}
        </CardContent>
      </Card>
    </div>
  );
};
