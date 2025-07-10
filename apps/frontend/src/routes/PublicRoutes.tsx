import { RouteObject } from 'react-router-dom';
import { JSX, lazy, Suspense } from 'react';

const PublicLayout = lazy(() => import('@layouts/PublicLayout'));
const LoginPage = lazy(() => import('@pages/public/LoginPage'));
const RegisterPage = lazy(() => import('@pages/public/RegisterPage'));
const MarketingPage = lazy(() => import('@pages/public/MarketingPage'));
const OauthCallbackPage = lazy(() => import('@pages/plugin/OauthCallbackPage'));
const NotFoundPage = lazy(() => import('@pages/public/NotFoundPage'));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const publicRoutes: RouteObject = {
  element: withSuspense(PublicLayout),
  children: [
    { path: '/', element: withSuspense(MarketingPage) },
    { path: '/login', element: withSuspense(LoginPage) },
    { path: '/register', element: withSuspense(RegisterPage) },
    { path: '/auth/google/callback', element: withSuspense(OauthCallbackPage) },
    { path: '*', element: withSuspense(NotFoundPage) }
  ]
};

export default publicRoutes;
