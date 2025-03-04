import AuthVerify from '@components/auth/AuthVerify';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

export function Layout() {
  return (
    <div>
      <Header />
      <AuthVerify />
      <Outlet />
    </div>
  );
}
