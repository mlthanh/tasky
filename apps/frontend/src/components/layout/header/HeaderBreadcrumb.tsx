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
import { useLocation, Link } from 'react-router-dom';

export function HeaderBreadcrumb() {
  const location = useLocation();
  const { getLabel } = useLanguage();

  // Tách path thành mảng
  const pathnames = location.pathname.split('/').filter(Boolean);

  const routingPath = (path: string) => {
    switch (path) {
      case ApplicationSideBarUrl.DASHBOARD:
        return getLabel('men_main_002');
      case ApplicationSideBarUrl.SETTING:
        return getLabel('men_main_005');
      case WorkspacesSideBarUrl.WORKSPACE:
        return getLabel('grp_main_002');
      default:
        return isNaN(Number(path)) ? path : `#${path}`;
    }
  };

  return (
    <Breadcrumb className="hidden xl:block">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem className="text-base">
          <BreadcrumbLink asChild>
            <Link to="/" className="text-black dark:text-light-mode">
              {getLabel('men_main_001')}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((segment, index) => {
          const fullPath = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;

          return (
            <span key={fullPath} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-base font-semibold">
                    {routingPath(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink>
                    <Link to={fullPath} className="text-base">
                      {routingPath(segment)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
