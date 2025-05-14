import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="relative light-mode dark:dark-mode font-Quicksand">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
