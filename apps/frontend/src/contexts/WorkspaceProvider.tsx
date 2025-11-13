import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { trpc } from '@frontend/utils/trpc';
import { useToast } from '@frontend/contexts/ToastProvider';
import { useUserStore } from '@hooks/stores/useUserStore';

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
  const { user } = useUserStore();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const prevWorkspacesRef = useRef<Workspace[]>([]); // ref để track state cũ

  const {
    data: res,
    isLoading,
    refetch
  } = trpc.workspace.get.useQuery(undefined, {
    enabled: !!user,
    retry: false
  });

  useEffect(() => {
    if (!user) {
      setWorkspaces([]);
      prevWorkspacesRef.current = [];
    }
  }, [user]);

  useEffect(() => {
    if (!res || res.success === undefined) return;

    if (res.success) {
      const newData: Workspace[] = res.data ?? [];

      const isSame =
        newData.length === prevWorkspacesRef.current.length &&
        newData.every(
          (item, i) =>
            item.id === prevWorkspacesRef.current[i]?.id &&
            item.name === prevWorkspacesRef.current[i]?.name &&
            item.imageUrl === prevWorkspacesRef.current[i]?.imageUrl
        );

      if (!isSame) {
        setWorkspaces(newData);
        prevWorkspacesRef.current = newData;
      }
    } else {
      if (prevWorkspacesRef.current.length > 0) {
        setWorkspaces([]);
        prevWorkspacesRef.current = [];
      }
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
