import { Outlet } from 'react-router-dom';
import AuthVerify from './auth/AuthVerify';

export function Layout() {
  return (
    <div>
      <AuthVerify />
      <Outlet />
    </div>
  );
}
