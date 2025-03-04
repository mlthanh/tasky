import { RouteObject } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Layout } from '@components/layout/Layout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: '',
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

export default routes;
