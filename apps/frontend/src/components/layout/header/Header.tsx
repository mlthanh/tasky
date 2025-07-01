import { NotificationBell } from '@components/common/Icon';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import ThemeToggler from './ThemeToggler';

import { useUserStore } from '@hooks/stores';
import { LanguageSelectBox } from './LanguageSelectBox';
import { SettingsDropdown } from './SettingsDropdown';

const Header = () => {
  const { user } = useUserStore();

  return (
    <div className="flex items-center justify-center xl:justify-between w-full py-[20px]">
      <HeaderBreadcrumb className="hidden xl:block" />
      <div className="flex items-center justify-center gap-8">
        <LanguageSelectBox />
        <ThemeToggler />
        <NotificationBell className="w-5 h-5" />
        <SettingsDropdown />
      </div>
    </div>
  );
};

export default Header;
