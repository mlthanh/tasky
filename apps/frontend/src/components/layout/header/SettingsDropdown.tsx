import { Avatar, AvatarFallback } from '@frontend/components/common/Avatar';
import {
  DropdownContent,
  DropdownItem,
  DropdownRoot,
  DropdownTrigger
} from '@frontend/components/common/Dropdown';
import { RoundLogout } from '@frontend/components/common/Icon';
import { Separator } from '@frontend/components/common/Separator';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useUserStore } from '@frontend/hooks/stores';
import { useNavigate } from 'react-router-dom';

export const SettingsDropdown = () => {
  const { getLabel } = useLanguage();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const avatarFallback = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase() ?? 'U';

  return (
    <DropdownRoot>
      <DropdownTrigger className="flex items-center justify-center">
        <Avatar className="flex items-center justify-center rounded-full select-none bg-primary hover:opacity-75">
          <AvatarFallback className="font-bold text-white ">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownTrigger>
      <DropdownContent className="w-[250px] p-1">
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 ">
          <Avatar className="flex items-center justify-center rounded-full size-12 bg-primary">
            <AvatarFallback className="text-xl font-bold text-white select-none">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <p className="text-sm text-neutral-900">{user?.name || 'User'}</p>
          <p className="text-xs text-neutral-500">{user?.email}</p>
        </div>
        <Separator
          variant="dot"
          orientation="horizontal"
          className="my-2 text-black"
        />
        <DropdownItem
          onClick={() => {
            localStorage.removeItem('auth');
            navigate('/login');
          }}
          className="flex items-center justify-center gap-2 font-semibold text-red"
        >
          <RoundLogout />
          {getLabel('lbl_main_001')}
        </DropdownItem>
      </DropdownContent>
    </DropdownRoot>
  );
};
