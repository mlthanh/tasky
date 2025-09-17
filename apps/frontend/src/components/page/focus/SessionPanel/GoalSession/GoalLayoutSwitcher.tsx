import { useDeviceStore } from '@hooks/stores';
import {
  GoalSession,
  GoalModal
} from '@frontend/components/page/focus/SessionPanel/GoalSession';

export const GoalLayoutSwitcher = () => {
  const { isMobile } = useDeviceStore();

  if (isMobile) return <GoalModal />;
  return <GoalSession />;
};
