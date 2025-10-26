import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { trpc } from '@frontend/utils/trpc';
import { useToast } from '@frontend/contexts/ToastProvider';

type Workspace = {
  id: string;
  name: string;
  imageUrl: string;
};

type WorkspaceContextType = {
  workspaces: Workspace[];
  isLoading: boolean;
  refetch: () => void;
  setWorkspaces: (data: Workspace[]) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { showToastError } = useToast();

  const {
    data: res,
    isLoading,
    refetch
  } = trpc.workspace.get.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false
  });

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    if (res?.success) {
      setWorkspaces(res.data);
    } else if (res?.success === false) {
      showToastError('Workspace fetch error: ' + res.error);
    }
  }, [res]);

  const value = useMemo(
    () => ({
      workspaces,
      isLoading,
      refetch,
      setWorkspaces
    }),
    [workspaces, isLoading, refetch]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const ctx = useContext(WorkspaceContext);
  if (!ctx)
    throw new Error('useWorkspace must be used inside <WorkspaceProvider>');
  return ctx;
};
