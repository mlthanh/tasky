import { RouteObject } from 'react-router-dom';
import PublicLayout from '@layouts/PublicLayout';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import { MarketingPage } from '@pages/MarketingPage';
import GoogleCallbackPage from '@pages/GoogleCallback';

const publicRoutes: RouteObject = {
  element: <PublicLayout />,

  children: [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/', element: <MarketingPage /> },
    { path: '/auth/google/callback', element: <GoogleCallbackPage /> },
  ],
};

export default publicRoutes;
