import { trpc } from '@frontend/utils/trpc';
import WorkspaceSwitcherUI from './WorkspaceSwitcherUI';

export const WorkspaceSwitcher = () => {
  const workspace = trpc.workspace.get.useQuery();

  return <WorkspaceSwitcherUI data={workspace?.data} />;
};
