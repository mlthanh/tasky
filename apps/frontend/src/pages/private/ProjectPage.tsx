import { WorkspaceSwitcher } from '@frontend/components/layout/sidebar/workspaceswitcher/WorkspaceSwitcher';
import { WorkspaceForm } from '@frontend/components/page/workspace/WorkspaceForm';

const ProjectPage = () => {
  return (
    <div className="">
      Project Page
      <WorkspaceForm
        onCancel={() => {
          console.log('cancel');
        }}
      />
      <WorkspaceSwitcher />
    </div>
  );
};

export default ProjectPage;
