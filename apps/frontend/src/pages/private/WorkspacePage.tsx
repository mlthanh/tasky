import { useParams } from 'react-router-dom';

const WorkspacePage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Workspace: {id}</h1>
    </div>
  );
};

export default WorkspacePage;
