import { useToast } from '@frontend/contexts/ToastProvider';
import { trpc } from '@frontend/utils/trpc';
import { WorkspaceFormUI } from './WorkspaceFormUI';
import { createWorkspaceDto } from '@shared/trpc/schemas/workspace.schema';
import { useWorkspace } from '@frontend/contexts/WorkspaceProvider';

interface WorkspaceFormProps {
  onCancel: () => void;
}

export const WorkspaceForm = ({ onCancel }: WorkspaceFormProps) => {
  const { showToastSuccess, showToastError } = useToast();
  const { workspaces, setWorkspaces, refetch } = useWorkspace();

  const createWorkspaceMutation = trpc.workspace.create.useMutation({
    onSuccess(res) {
      showToastSuccess('Workspace created successfully!');
      setWorkspaces([...workspaces, res.data]);

      // Nếu muốn fetch lại server data thay vì update local:
      // refetch();
    },
    onError(error) {
      showToastError(error.message, 'manual');
    }
  });

  const onSubmit = (values: createWorkspaceDto) => {
    createWorkspaceMutation.mutate(values);
  };

  return (
    <WorkspaceFormUI
      onSubmit={onSubmit}
      onCancel={onCancel}
      isPending={createWorkspaceMutation.isPending}
    />
  );
};
