import { RouteObject } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import privateRoutes from './PrivateRoutes';

const routes: RouteObject[] = [privateRoutes, publicRoutes];

export default routes;
