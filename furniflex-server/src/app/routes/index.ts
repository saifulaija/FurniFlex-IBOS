import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';
import { ProductsRoutes } from '../modules/Products/product.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/products',
    route: ProductsRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
