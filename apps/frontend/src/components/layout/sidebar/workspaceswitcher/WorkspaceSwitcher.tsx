import { trpc } from '@frontend/utils/trpc';
import WorkspaceSwitcherUI from './WorkspaceSwitcherUI';
import { useToast } from '@frontend/contexts/ToastProvider';

export const WorkspaceSwitcher = () => {
  const { data: res } = trpc.workspace.get.useQuery();
  const workspaces = res?.success ? res.data : [];
  const { showToastError } = useToast();

  if (res?.success === false) {
    showToastError('Workspace fetch error:' + res.error);
  }

  return <WorkspaceSwitcherUI workspaces={workspaces} />;
};
