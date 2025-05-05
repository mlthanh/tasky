// routes/publicRoutes.ts
import { RouteObject } from 'react-router-dom';
import PublicLayout from '@layouts/PublicLayout';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import { MarketingPage } from '@pages/MarketingPage';

const publicRoutes: RouteObject = {
  element: <PublicLayout />,
  children: [
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/getting', element: <MarketingPage /> },
  ],
};

export default publicRoutes;
