import { WorkspaceSwitcher } from '@frontend/components/layout/sidebar/workspaceswitcher/WorkspaceSwitcher';
import YouTubeBackground from '@frontend/components/page/focus/YoutubeBackground';
import { WorkspaceForm } from '@frontend/components/page/workspace/WorkspaceForm';

const ProjectPage = () => {
  return (
    <div className="relative w-full h-full px-app">
      <WorkspaceForm onCancel={() => {}} />{' '}
    </div>
  );
};

export default ProjectPage;
