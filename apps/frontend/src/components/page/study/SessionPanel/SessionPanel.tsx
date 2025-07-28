import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { TimerLayoutSwitcher } from './TimerSession/TimerLayoutSwitcher';
import { GoalLayoutSwitcher } from './GoalSession/GoalLayoutSwitcher';

interface SessionPanelProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

const SessionPanel = ({ className, timer }: SessionPanelProps) => {
  const { isTimerOpen, isGoalOpen } = useUIStateStore();

  return (
    <div className={`flex flex-col gap-2 h-full ${className}`}>
      {isTimerOpen && <TimerLayoutSwitcher timer={timer} />}
      {isGoalOpen && <GoalLayoutSwitcher />}
    </div>
  );
};

export default SessionPanel;
