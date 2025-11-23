import { Modal } from '@frontend/components/common/Modal';
import { WorkspaceForm } from './WorkspaceForm';
import { useUIStateStore } from '@frontend/hooks/stores';

export const WorkspaceModal = () => {
  const { isWorkspaceModelOpen, setIsWorkspaceModelOpen } = useUIStateStore();
  return (
    <Modal isOpen={isWorkspaceModelOpen}>
      <WorkspaceForm
        onCancel={() => {
          setIsWorkspaceModelOpen(!isWorkspaceModelOpen);
        }}
      />
    </Modal>
  );
};
