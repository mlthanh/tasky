import { GoalSession } from '@components/study/SessionPanel/GoalSession/GoalSession';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';
import { TimerLayoutSwitcher } from './TimerSession/TimerLayoutSwitcher';
import { useEffect, useRef, useState } from 'react';

interface SessionPanelProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

const SessionPanel = ({ className, timer }: SessionPanelProps) => {
  const { isTimerOpen, isGoalOpen } = useUIStateStore();
  const { isMobile } = useDeviceStore();

  return (
    <div className={`flex flex-col gap-2 h-full ${className}`}>
      {isTimerOpen && (
        <div className="shrink-0">
          <TimerLayoutSwitcher timer={timer} />
        </div>
      )}

      {isGoalOpen && !isMobile && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <GoalSession className="px-4 py-3 text-sm bg-black/85" />
        </div>
      )}
    </div>
  );
};

export default SessionPanel;
