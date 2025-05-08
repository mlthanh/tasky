import { useEffect, useState } from 'react';
import TimerSession from '@components/study/SessionPanel/PersonalTimer/TimerSession';
import { GoalSession } from '@components/study/SessionPanel/GoalSession/GoalSession';
import { useUIStateStore } from '@hooks/stores/useUIStateStore';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import { useTimeStore } from '@hooks/stores/useTimeStore';
import { Modal } from '@components/common/Modal';
import TimerDetail from './PersonalTimer/TimerDetail';
import TimerModal from './PersonalTimer/TimerModal';
import { useDeviceStore } from '@hooks/stores/useDeviceStore';

interface SessionPanelProps {
  className?: string;
  timer: ReturnType<typeof usePomodoroTimer>;
}

const SessionPanel = ({ className = '', timer }: SessionPanelProps) => {
  const { isTimerOpen, isGoalOpen, setIsTimerOpen, isTimerDetail } =
    useUIStateStore();
  const { isMobile } = useDeviceStore();

  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        {(!isTimerOpen && !isMobile) ||
          (!isTimerDetail && (
            <TimerSession
              timer={timer}
              className=" sm:px-3 sm:py-2 sm:text-sm bg-black/85 xl:p-7 lg:p-5"
            />
          ))}

        {!isMobile && !isGoalOpen && (
          <GoalSession className="px-3 py-2 text-sm bg-black/85 xl:p-7 lg:p-5" />
        )}
      </div>

      <Modal
        isOpen={isMobile && isTimerOpen}
        onClose={() => setIsTimerOpen(!isTimerOpen)}
      >
        <TimerModal timer={timer} />
      </Modal>
    </>
  );
};

export default SessionPanel;
