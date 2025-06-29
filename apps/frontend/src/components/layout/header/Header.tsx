import { NotificationBell } from '@components/common/Icon';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import ThemeToggler from './ThemeToggler';

import { useUserStore } from '@hooks/stores';
import { LanguageSelectBox } from './LanguageSelectBox';

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className="flex items-center justify-center xl:justify-between w-full py-[20px]">
      <HeaderBreadcrumb className="hidden xl:block" />
      <div className="flex items-center justify-center gap-8">
        <LanguageSelectBox />
        <ThemeToggler />
        <NotificationBell className="w-5 h-5" />
        <div className="flex items-start justify-center gap-2">
          <span className="text-sm">{user?.username}</span>
          <div className="rounded-full bg-primary w-7 h-7"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
