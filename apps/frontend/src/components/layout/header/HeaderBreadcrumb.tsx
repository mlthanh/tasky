import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/common/Breadcrumb';
import {
  ApplicationSideBarUrl,
  WorkspacesSideBarUrl
} from '@frontend/constants/sidebar';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useLocation } from 'react-router-dom';

export function HeaderBreadcrumb() {
  const location = useLocation();
  const { getLabel } = useLanguage();
  type pathType = ApplicationSideBarUrl | WorkspacesSideBarUrl;

  const routingPath = (path: pathType) => {
    switch (path) {
      case ApplicationSideBarUrl.DASHBOARD:
        return getLabel('men_main_002');
      case WorkspacesSideBarUrl.PROJECT:
        return getLabel('men_main_004');
      default:
        return '';
    }
  };

  return (
    <Breadcrumb className="hidden xl:block">
      <BreadcrumbList>
        <BreadcrumbItem className="text-base">
          <BreadcrumbLink className="text-black dark:text-light-mode">
            {getLabel('men_main_001')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-base font-semibold">
            {routingPath(location.pathname as pathType)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
