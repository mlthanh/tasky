import { NotificationBell } from '@components/common/Icon';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import ThemeToggler from './ThemeToggler';

import { LanguageSelectBox } from './LanguageSelectBox';
import { SettingsDropdown } from './SettingsDropdown';

const Header = () => {
  return (
    <div className="flex items-center justify-center xl:justify-between w-full py-[5px]">
      <HeaderBreadcrumb />
      <div className="flex items-center justify-center gap-4">
        <ThemeToggler />
        <NotificationBell className="w-5 h-5" />
        <LanguageSelectBox />
        <SettingsDropdown />
      </div>
    </div>
  );
};

export default Header;
