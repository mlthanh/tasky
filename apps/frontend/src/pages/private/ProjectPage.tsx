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
    </div>
  );
};

export default ProjectPage;
