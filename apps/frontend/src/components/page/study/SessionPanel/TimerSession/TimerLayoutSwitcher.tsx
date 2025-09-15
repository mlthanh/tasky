import { useDeviceStore, useUIStateStore } from '@hooks/stores';
import {
  TimerModal,
  TimerSession,
  TimerSessionM
} from '@frontend/components/page/study/SessionPanel/TimerSession';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';

interface props {
  timer: ReturnType<typeof usePomodoroTimer>;
}

export const TimerLayoutSwitcher = ({ timer }: props) => {
  const { isMobile } = useDeviceStore();
  const { isTimerDetail } = useUIStateStore();

  if (isMobile) {
    return isTimerDetail ? (
      <TimerModal timer={timer} />
    ) : (
      <TimerSessionM timer={timer} />
    );
  }
  return <TimerSession timer={timer} />;
};
