import { Outlet, useLocation } from 'react-router-dom';
import Header from '@components/layout/header/Header';
import { SidebarProvider, SidebarTrigger } from '@components/common/SideBar';
import { AppSidebar } from '@components/layout/AppSideBar';
import AuthVerify from '@components/auth/AuthVerify';

const PrivateLayout = () => {
  const location = useLocation();
  const isStudyPage = location.pathname === '/study';

  return (
    <div className="light-mode dark:dark-mode font-Quicksand">
      <AuthVerify />
      <SidebarProvider>
        <AppSidebar />
        <main
          className={`w-full ${
            isStudyPage ? 'overflow-y-hidden h-screen' : ''
          }`}
        >
          <div
            className={`border-b-2 flex items-center justify-center ${
              isStudyPage ? 'invisible h-0' : 'px-app'
            }`}
          >
            <SidebarTrigger className="inline-block" />
            <Header />
          </div>

          <div
            className={`${
              isStudyPage ? '' : 'mt-5 px-app'
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
