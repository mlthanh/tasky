import { useToast } from '@frontend/contexts/ToastProvider';
import { trpc } from '@frontend/utils/trpc';

export const useCreateWorkspace = () => {
  const { showToastSuccess, showToastError } = useToast();
  return trpc.workspace.create.useMutation({
    onSuccess() {
      showToastSuccess('Workspace created successfully!');
    },
    onError(error) {
      showToastError(error.message, 'manual');
    }
  });
};
