import {
  BaselineSpaceDashboard,
  LapTimer,
  ProjectsAltFill,
} from '@components/common/Icon';
import { SVGProps } from 'react';

export interface MenuItemType {
  title: string;
  url: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export enum SideBarUrl {
  DASHBOARD = '/dashboard',
  STUDY = '/study',
  PROJECT = '/project',
}

export const getSideBarList = (): MenuItemType[] => [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: BaselineSpaceDashboard,
  },
  {
    title: 'Projects',
    url: '/project',
    icon: ProjectsAltFill,
  },
  {
    title: 'Study',
    url: '/study',
    icon: LapTimer,
  },
];
