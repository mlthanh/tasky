import {
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger
} from '@frontend/components/common/Dropdown';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useUserStore } from '@frontend/hooks/stores';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SettingsDropdown = () => {
  const { getLabel } = useLanguage();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <DropdownRoot>
      <DropdownTrigger className="flex items-center justify-center">
        <div className="flex items-center justify-center font-bold text-white rounded-full size-7 bg-primary">
          <span>{user?.name.charAt(0)}</span>
        </div>
      </DropdownTrigger>
      <DropdownContent className="xl:min-w-[150px] p-1">
        <DropdownItem>{getLabel('profile')}</DropdownItem>
        <DropdownItem>{getLabel('settings')}</DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          onClick={() => {
            localStorage.removeItem('auth');
            navigate('/login');
          }}
          className="font-semibold text-red"
        >
          {getLabel('logout')}
        </DropdownItem>
      </DropdownContent>
    </DropdownRoot>
  );
};
