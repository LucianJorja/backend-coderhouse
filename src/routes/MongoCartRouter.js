import { Router } from "express";
const router = Router();

import { getAllCartsController, createCartController, getCartByIdController, updateProductQuantityController ,updateCartController, deleteCartController } from "../controllers/cartsController.js";

router.get('/', getAllCartsController);
router.get('/:', getCartByIdController);
router.post('/', createCartController);
router.put('/:cartId/products/:productId', updateProductQuantityController);
router.put('/:id', updateCartController);
router.delete('/:id', deleteCartController);

export default router;