import { WorkspaceForm } from '@frontend/components/page/workspace/WorkspaceForm';

const ProjectPage = () => {
  return (
    <div className="relative w-full h-full px-app">
      <WorkspaceForm
        onCancel={() => {
          console.log('cancel');
        }}
      />
    </div>
  );
};

export default ProjectPage;
