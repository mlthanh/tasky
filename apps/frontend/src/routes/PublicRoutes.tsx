import { RouteObject } from 'react-router-dom';
import PublicLayout from '@layouts/PublicLayout';
import LoginPage from '@pages/public/LoginPage';
import RegisterPage from '@pages/public/RegisterPage';
import { MarketingPage } from '@pages/public/MarketingPage';
import OauthCallbackPage from '@pages/OauthCallbackPage';
import NotFoundPage from '@pages/public/NotFoundPage';

const publicRoutes: RouteObject = {
  element: <PublicLayout />,

  children: [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/', element: <MarketingPage /> },
    { path: '/auth/google/callback', element: <OauthCallbackPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
};

export default publicRoutes;
