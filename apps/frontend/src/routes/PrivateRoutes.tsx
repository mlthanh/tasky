import { RouteObject } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';
import Loader from '@components/Loader';

const PrivateLayout = lazy(() => import('@layouts/PrivateLayout'));
const HomePage = lazy(() => import('@pages/private/HomePage'));
const StudyPage = lazy(() => import('@pages/private/StudyPage'));
const ProjectPage = lazy(() => import('@pages/private/ProjectPage'));

const withSuspense = (Component: React.ComponentType): JSX.Element => {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

const privateRoutes: RouteObject = {
  element: withSuspense(PrivateLayout),
  children: [
    { path: '/dashboard', element: <HomePage /> },
    { path: '/study', element: <StudyPage /> },
    { path: '/project', element: <ProjectPage /> }
  ]
};

export default privateRoutes;
