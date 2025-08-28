import { useToast } from '@frontend/contexts/ToastProvider';
import { trpc } from '@frontend/utils/trpc';

export const useCreateWorkspace = () => {
  const { showToastError } = useToast();

  return trpc.workspace.create.useMutation({
    onSuccess({ name }) {
      console.log('workspace', name);
    },
    onError(error) {
      showToastError(error.message);
    }
  });
};
