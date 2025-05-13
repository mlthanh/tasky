import { useDeviceStore, useUIStateStore } from '@hooks/stores';
import {
  TimerModal,
  TimerSession,
  TimerSessionM,
} from '@components/study/SessionPanel/TimerSession';
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
      <TimerSessionM
        timer={timer}
        className="absolute p-5 transform -translate-x-1/2 -translate-y-1/2 bg-black top-1/2 left-1/2"
      />
    );
  }
  return (
    <TimerSession
      timer={timer}
      className="h-full px-4 py-3 sm:text-sm bg-black/85"
    />
  );
};
