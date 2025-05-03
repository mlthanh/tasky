// components/study/SessionPanel.tsx
import TimerSession from '@components/study/SessionPanel/PersonalTimer/TimerSession';
import { GoalSession } from '@components/study/SessionPanel/GoalSession/GoalSession';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useTimeStore } from '@hooks/stores/useTimeStore';

interface SessionPanelProps {
  className?: string;
}

const SessionPanel = ({ className = '' }: SessionPanelProps) => {
  const { isTimerOpen, isGoalOpen } = useUIStateStore();
  const { fTime, bTime } = useTimeStore();
  const timer = usePomodoroTimer({ focusTime: fTime, breakTime: bTime });

  return (
    <div className={`w-[20vw] h-[80vh] flex flex-col gap-2 ${className}`}>
      <TimerSession
        timer={timer}
        className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
          isTimerOpen ? 'hidden' : ''
        }`}
      />
      <GoalSession
        className={`px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5 ${
          isGoalOpen ? 'hidden' : ''
        }`}
      />
    </div>
  );
};

export default SessionPanel;
