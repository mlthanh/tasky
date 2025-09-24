import { useToast } from '@frontend/contexts/ToastProvider';
import { trpc } from '@frontend/utils/trpc';
import { WorkspaceFormUI } from './WorkspaceFormUI';
import { createWorkspaceDto } from '@shared/trpc/schemas/workspace.schema';

interface WorkspaceFormProps {
  onCancel: () => void;
}

export const WorkspaceForm = ({ onCancel }: WorkspaceFormProps) => {
  const { showToastSuccess, showToastError } = useToast();
  const trpcCtx = trpc.useUtils();

  const createWorkspaceMutation = trpc.workspace.create.useMutation({
    onSuccess() {
      showToastSuccess('Workspace created successfully!');
      trpcCtx.workspace.get.invalidate();
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
