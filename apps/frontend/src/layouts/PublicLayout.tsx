import { Outlet } from 'react-router-dom';
const PublicLayout = () => (
  <div className="light-mode dark:dark-mode font-Quicks">
    <Outlet />
  </div>
);

export default PublicLayout;
