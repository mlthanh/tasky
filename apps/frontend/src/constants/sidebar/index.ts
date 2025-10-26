import { SVGProps } from 'react';
import {
  ApplicationSideBarUrl,
  useApplicationSideBarList
} from './ApplicationMenuList';
import {
  WorkspacesSideBarUrl,
  useWorkspacesSideBarList
} from './WorkspaceMenuList';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export interface MenuItemType {
  title: string;
  url: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  subItem?: MenuItemType;
}

type SideBarListType = {
  group: string;
  items: MenuItemType[];
};

export const useSidebarList = (): SideBarListType[] => {
  const applicationItems = useApplicationSideBarList();
  //const workspaceItems = useWorkspacesSideBarList();
  const { getLabel } = useLanguage();

  return [
    {
      group: getLabel('grp_main_001'),
      items: applicationItems
    }
  ];
};

export { WorkspacesSideBarUrl, ApplicationSideBarUrl };
