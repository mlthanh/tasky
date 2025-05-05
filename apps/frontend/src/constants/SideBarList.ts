import { BaselineSpaceDashboard, LapTimer } from '@common/Icon';
import { SVGProps } from 'react';

export interface MenuItemType {
  title: string;
  url: string;
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const getSideBarList = (): MenuItemType[] => [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: BaselineSpaceDashboard,
  },
  {
    title: 'Study',
    url: '/study',
    icon: LapTimer,
  },
];
