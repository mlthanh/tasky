import { Outlet, useLocation } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger } from '@components/common/SideBar';
import { AppSidebar } from '@frontend/components/layout/sidebar/AppSideBar';
import Header from '@components/layout/header/Header';
import { useAuth } from '@frontend/hooks/useAuth';
import Loader from '@frontend/components/Loader';

const PrivateLayout = () => {
  const location = useLocation();

  const isFocusPage = location.pathname === '/focus';
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="light-mode dark:dark-mode font-Quicksand">
      <SidebarProvider>
        <AppSidebar />
        <main
          className={`w-full ${
            isFocusPage ? 'overflow-y-hidden h-screen' : ''
          }`}
        >
          <div
            className={`border-b-2 flex items-center justify-center gap-4 ${
              isFocusPage ? 'invisible h-0' : 'px-app'
            }`}
          >
            <SidebarTrigger className="text-dark-mode dark:text-light-mode dark:hover:bg-light-mode/10" />
            <Header />
          </div>

          <div
            className={`${
              isFocusPage ? '' : 'mt-5 px-app'
            } light-mode dark:dark-mode`}
          >
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default PrivateLayout;
