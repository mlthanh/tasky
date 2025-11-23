import { Outlet, useLocation, useMatch } from 'react-router-dom';

import { SidebarProvider, SidebarTrigger } from '@components/common/SideBar';
import { AppSidebar } from '@frontend/components/layout/sidebar/AppSideBar';
import Header from '@components/layout/header/Header';
import { WorkspaceProvider } from '@frontend/contexts/WorkspaceProvider';
import AuthVerify from '@frontend/components/auth/AuthVerify';
import { WorkspaceModal } from '@frontend/components/page/workspace/WorkspaceModal';

const PrivateLayout = () => {
  const isFocusPage = useMatch('/focus');

  return (
    <WorkspaceProvider>
      <AuthVerify />
      <WorkspaceModal />
      <div className="light-mode dark:dark-mode font-Quicksand">
        <SidebarProvider>
          <AppSidebar />
          <main
            className={`w-full ${
              isFocusPage ? 'overflow-y-hidden h-screen' : ''
            }`}
          >
            {!isFocusPage && (
              <div className="flex items-center justify-center gap-4 border-b-2 px-app">
                <SidebarTrigger className="text-dark-mode dark:text-light-mode dark:hover:bg-light-mode/10" />
                <Header />
              </div>
            )}
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
    </WorkspaceProvider>
  );
};

export default PrivateLayout;
