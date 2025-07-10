import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const PrivateLayout = lazy(() => import('@layouts/PrivateLayout'));
const HomePage = lazy(() => import('@pages/private/HomePage'));
const StudyPage = lazy(() => import('@pages/private/StudyPage'));
const ProjectPage = lazy(() => import('@pages/private/ProjectPage'));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const privateRoutes: RouteObject = {
  element: withSuspense(PrivateLayout),
  children: [
    { path: '/dashboard', element: withSuspense(HomePage) },
    { path: '/study', element: withSuspense(StudyPage) },
    { path: '/project', element: withSuspense(ProjectPage) }
  ]
};

export default privateRoutes;
