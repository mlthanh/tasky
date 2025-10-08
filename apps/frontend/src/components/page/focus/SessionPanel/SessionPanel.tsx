import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { TimerLayoutSwitcher } from './TimerSession/TimerLayoutSwitcher';
import { GoalLayoutSwitcher } from './GoalSession/GoalLayoutSwitcher';

interface SessionPanelProps {
  timer: ReturnType<typeof usePomodoroTimer>;
}

const SessionPanel = ({ timer }: SessionPanelProps) => {
  const { isTimerOpen, isGoalOpen } = useUIStateStore();

  return (
    <div className="flex flex-col gap-2 h-full xl:w-[20vw] sm:w-[38vw] md:w-[32vw] lg:w-[25vw] z-[999]">
      {isTimerOpen && <TimerLayoutSwitcher timer={timer} />}
      {isGoalOpen && <GoalLayoutSwitcher />}
    </div>
  );
};

export default SessionPanel;
