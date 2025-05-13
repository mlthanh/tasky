import { RouteObject } from 'react-router-dom';
import PrivateLayout from '@layouts/PrivateLayout';
import HomePage from '@pages/HomePage';
import StudyPage from '@pages/StudyPage';
import { ProjectPage } from '@pages/ProjectPage';

const privateRoutes: RouteObject = {
  element: <PrivateLayout />,
  children: [
    { path: '/dashboard', element: <HomePage /> },
    { path: '/study', element: <StudyPage /> },
    { path: '/project', element: <ProjectPage /> },
  ],
};

export default privateRoutes;
