import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post(
  '/create-product',

  validateRequest(ProductValidations.CreateProductValidationSchema),
  ProductControllers.createProduct,
);

router.patch('/delete-product/:id', ProductControllers.deleteProduct);

router.get(
  '/get-single-product/:id',

  ProductControllers.getSingleProduct,
);

router.get(
  '/',

  ProductControllers.getAllProducts,
);

router.get(
  '/category/:category',

  ProductControllers.getAllProductsByCategory,
);

export const ProductsRoutes = router;
