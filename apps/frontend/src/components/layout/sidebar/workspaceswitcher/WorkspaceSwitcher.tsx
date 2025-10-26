import WorkspaceSwitcherUI from './WorkspaceSwitcherUI';
import { useWorkspace } from '@frontend/contexts/WorkspaceProvider';

export const WorkspaceSwitcher = () => {
  const { workspaces, isLoading } = useWorkspace();

  if (isLoading) return <div>Loading...</div>;

  return <WorkspaceSwitcherUI workspaces={workspaces} />;
};
