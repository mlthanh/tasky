import { SVGProps } from 'react';
import {
  ApplicationSideBarUrl,
  useApplicationSideBarList
} from './ApplicationMenuList';
import {
  WorkspacesSideBarUrl,
  useWorkspacesSideBarList
} from './WorkspaceMenuList';

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
  const workspaceItems = useWorkspacesSideBarList();

  return [
    {
      group: '',
      items: applicationItems
    },
    {
      group: 'Workspaces',
      items: workspaceItems
    }
  ];
};

export { WorkspacesSideBarUrl, ApplicationSideBarUrl };
