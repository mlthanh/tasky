import { RouteObject } from 'react-router-dom';
import PrivateLayout from '@layouts/PrivateLayout';
import HomePage from '@pages/HomePage';
import StudyPage from '@pages/StudyPage';

const privateRoutes: RouteObject = {
  element: <PrivateLayout />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/study', element: <StudyPage /> },
  ],
};

export default privateRoutes;
