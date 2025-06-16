import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/common/Breadcrumb';
import { SideBarUrl } from '@constants/SideBarList';
import { useLocation } from 'react-router-dom';

export function HeaderBreadcrumb() {
  const location = useLocation();
  type pathType = SideBarUrl;

  const routingPath = (path: pathType) => {
    switch (path) {
      case SideBarUrl.DASHBOARD:
        return 'Dashboard';
      case SideBarUrl.STUDY:
        return 'Study';
      case SideBarUrl.PROJECT:
        return 'Projects';
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
