import { NotificationBell } from '@common/Icon';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import ThemeToggler from './ThemeToggler';

import { useUserStore } from '@hooks/stores';

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className="flex items-center justify-between w-full py-[20px]">
      <HeaderBreadcrumb />
      <div className="flex items-center justify-center gap-8">
        <ThemeToggler />
        <NotificationBell className="w-5 h-5" />
        <div className="flex items-start justify-center gap-2">
          <span className="text-sm">{user?.name}</span>
          <div className="bg-black w-7 h-7"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
