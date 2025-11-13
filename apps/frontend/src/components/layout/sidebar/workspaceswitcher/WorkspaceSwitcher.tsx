import WorkspaceSwitcherUI from './WorkspaceSwitcherUI';
import { useWorkspace } from '@frontend/contexts/WorkspaceProvider';
import WorkspaceSkeleton from './WorkspaceSkeleton';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export const WorkspaceSwitcher = () => {
  const { workspaces, isLoading } = useWorkspace();
  const { getLabel } = useLanguage();

  if (isLoading) return <WorkspaceSkeleton />;

  if (workspaces?.length <= 0)
    return (
      <WorkspaceSkeleton msg={getLabel('lbl_workspace_002')} isDisable={true} />
    );

  return <WorkspaceSwitcherUI workspaces={workspaces} />;
};
