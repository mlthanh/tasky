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
      title: getLabel('men_main_002'),
      url: ApplicationSideBarUrl.DASHBOARD,
      icon: BaselineSpaceDashboard
    },
    {
      title: getLabel('men_main_003'),
      url: ApplicationSideBarUrl.STUDY,
      icon: LapTimer
    }
  ];
};
