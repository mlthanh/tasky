import { SVGProps } from 'react';
import {
  ApplicationSideBarUrl,
  getApplicationSideBarList,
} from './ApplicationMenuList';

import {
  WorkspacesSideBarUrl,
  getWorkspacesSideBarList,
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

export const SideBarList = [
  {
    group: '',
    items: getApplicationSideBarList(),
  },
  {
    group: 'Workspaces',
    items: getWorkspacesSideBarList(),
  },
] as SideBarListType[];

export { WorkspacesSideBarUrl, ApplicationSideBarUrl };
