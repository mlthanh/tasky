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

export function HeaderBreadcrumb({ className }) {
  const location = useLocation();
  const { getLabel } = useLanguage();
  type pathType = ApplicationSideBarUrl | WorkspacesSideBarUrl;

  const routingPath = (path: pathType) => {
    switch (path) {
      case ApplicationSideBarUrl.DASHBOARD:
        return getLabel('dashboard');
      case WorkspacesSideBarUrl.PROJECT:
        return getLabel('project');
      default:
        return '';
    }
  };

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem className="text-base">
          <BreadcrumbLink>{getLabel('home')}</BreadcrumbLink>
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
