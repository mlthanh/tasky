import { BaselineSpaceDashboard, LapTimer } from '@components/common/Icon';
import { MenuItemType } from '.';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export enum ApplicationSideBarUrl {
  DASHBOARD = '/dashboard',
  STUDY = '/study'
}

export const useApplicationSideBarList = (): MenuItemType[] => {
  const { getLabel } = useLanguage();

  return [
    {
      title: getLabel('dashboard'),
      url: ApplicationSideBarUrl.DASHBOARD,
      icon: BaselineSpaceDashboard
    },
    {
      title: getLabel('study'),
      url: ApplicationSideBarUrl.STUDY,
      icon: LapTimer
    }
  ];
};
