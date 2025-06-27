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
import { useLocation } from 'react-router-dom';

export function HeaderBreadcrumb() {
  const location = useLocation();
  type pathType = ApplicationSideBarUrl | WorkspacesSideBarUrl;

  const routingPath = (path: pathType) => {
    switch (path) {
      case ApplicationSideBarUrl.DASHBOARD:
        return 'Dashboard';
      case ApplicationSideBarUrl.STUDY:
        return 'Study';
      case WorkspacesSideBarUrl.PROJECT:
        return 'Project';
      default:
        return '';
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-base">
          <BreadcrumbLink>Home</BreadcrumbLink>
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
