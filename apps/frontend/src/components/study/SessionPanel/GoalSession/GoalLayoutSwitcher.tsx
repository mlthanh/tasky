import { useDeviceStore } from '@hooks/stores';
import { usePomodoroTimer } from '@hooks/usePomodoroTimer';
import {
  GoalSession,
  GoalModal,
} from '@components/study/SessionPanel/GoalSession';

export const GoalLayoutSwitcher = () => {
  const { isMobile } = useDeviceStore();

  if (isMobile) return <GoalModal />;
  return <GoalSession className="px-4 py-3 text-sm bg-black/85" />;
};
