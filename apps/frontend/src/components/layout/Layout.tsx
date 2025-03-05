import AuthVerify from '@components/auth/AuthVerify';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

export function Layout() {
  return (
    <div className="font-Quicksand px-app">
      <Header />
      <AuthVerify />
      <Outlet />
    </div>
  );
}
