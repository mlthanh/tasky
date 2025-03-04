import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@common/Breadcrumb';
import { useLocation } from 'react-router-dom';

export function HeaderBreadcrumb() {
  const location = useLocation();
  type pathType = '/dashboard' | '/study';

  const routingPath = (path: pathType) => {
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/study':
        return 'Study';
      default:
        return '';
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {routingPath(location.pathname as pathType)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
