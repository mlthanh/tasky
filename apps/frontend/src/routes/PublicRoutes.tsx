import { RouteObject } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';
import DelayedLoader from '@components/Loader';
import OauthErrorPage from '@pages/plugin/OauthErrorPage';

const PublicLayout = lazy(() => import('@layouts/PublicLayout'));
const LoginPage = lazy(() => import('@pages/public/LoginPage'));
const RegisterPage = lazy(() => import('@pages/public/RegisterPage'));
const MarketingPage = lazy(() => import('@pages/public/MarketingPage'));
const OauthCallbackPage = lazy(() => import('@pages/plugin/OauthCallbackPage'));
const NotFoundPage = lazy(() => import('@pages/public/NotFoundPage'));

const withSuspense = (Component: React.ComponentType): JSX.Element => {
  return (
    <Suspense fallback={<DelayedLoader />}>
      <Component />
    </Suspense>
  );
};

const publicRoutes: RouteObject = {
  element: withSuspense(PublicLayout),
  children: [
    { path: '/', element: <MarketingPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/auth/google/callback', element: <OauthCallbackPage /> },
    { path: '/auth/google/callback-error', element: <OauthErrorPage /> },
    { path: '*', element: <NotFoundPage /> }
  ]
};

export default publicRoutes;
