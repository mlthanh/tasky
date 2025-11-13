import { ProjectsAltFill } from '@components/common/Icon';
import { MenuItemType } from '.';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

export enum WorkspacesSideBarUrl {
  WORKSPACE = 'workspace'
}

export const useWorkspacesSideBarList = (): MenuItemType[] => {
  const { getLabel } = useLanguage();

  return [
    {
      title: getLabel('men_main_004'),
      url: WorkspacesSideBarUrl.WORKSPACE,
      icon: ProjectsAltFill
    }
  ];
};
