import { ProjectsAltFill } from '@components/common/Icon';
import { MenuItemType } from '.';

export enum WorkspacesSideBarUrl {
  PROJECT = '/project',
}

export const getWorkspacesSideBarList = (): MenuItemType[] => [
  {
    title: 'Project',
    url: WorkspacesSideBarUrl.PROJECT,
    icon: ProjectsAltFill,
  },
];
