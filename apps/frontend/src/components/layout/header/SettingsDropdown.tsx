import {
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger
} from '@frontend/components/common/Dropdown';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useNavigate } from 'react-router-dom';

export const SettingsDropdown = () => {
  const auth = localStorage.getItem('auth');
  const { getLabel } = useLanguage();

  if (!auth) return;
  const user = JSON.parse(auth);
  const navigate = useNavigate();

  return (
    <DropdownRoot>
      <DropdownTrigger>
        <div className="flex items-start justify-center gap-2 px-3 py-2 border rounded-full cursor-pointer border-primary">
          <div className="rounded-full bg-primary w-7 h-7"></div>
          <span className="text-sm font-semibold">{user?.name}</span>
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
