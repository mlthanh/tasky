import { BaselineSpaceDashboard, LapTimer } from '@components/common/Icon';
import { MenuItemType } from '.';

export enum ApplicationSideBarUrl {
  DASHBOARD = '/dashboard',
  STUDY = '/study',
}

export const getApplicationSideBarList = (): MenuItemType[] => [
  {
    title: 'Dashboard',
    url: ApplicationSideBarUrl.DASHBOARD,
    icon: BaselineSpaceDashboard,
  },
  {
    title: 'Study',
    url: ApplicationSideBarUrl.STUDY,
    icon: LapTimer,
  },
];
