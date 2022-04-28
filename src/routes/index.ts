import { Router } from 'express';
import { productsRoutes } from './products';
import { cartRoutes } from './cart';

const router = Router();

router.use('/productos', productsRoutes);
router.use('/carrito', cartRoutes);

export { router };
