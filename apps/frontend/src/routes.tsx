import { RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudyPage from '@pages/StudyPage';
import App from './App';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: '',
    children: [
      { index: true, path: '/dashboard', element: <HomePage /> },
      { path: '/study', element: <StudyPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

export default routes;
