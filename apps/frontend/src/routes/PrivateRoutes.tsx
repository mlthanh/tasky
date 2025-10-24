import { RouteObject } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';
import Loader from '@components/Loader';

const PrivateLayout = lazy(() => import('@layouts/PrivateLayout'));
const HomePage = lazy(() => import('@pages/private/HomePage'));
const FocusPage = lazy(() => import('@frontend/pages/private/FocusPage'));
const ProjectPage = lazy(() => import('@pages/private/ProjectPage'));
const WorkspacePage = lazy(
  () => import('@frontend/pages/private/WorkspacePage')
);

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
    { path: '/focus', element: <FocusPage /> },
    { path: '/project', element: <ProjectPage /> },
    { path: '/workspace/:id', element: <WorkspacePage /> }
  ]
};

export default privateRoutes;
