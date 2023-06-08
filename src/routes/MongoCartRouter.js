import { Router } from "express";
const router = Router();

import { getAllCartsController, createCartController, getCartByIdController, updateProductQuantityController, addProductToCartController ,removeProductFromCartController, updateCartController, deleteCartController, updateCartProductsController } from "../controllers/cartsController.js";

router.get('/', getAllCartsController);
router.get('/:id', getCartByIdController);
router.post('/', createCartController);
router.post('/:cartId/products/:productId', addProductToCartController);
router.put('/:cid/products/:pid', updateProductQuantityController);
router.put('/:cid', updateCartProductsController);
router.put('/:id', updateCartController);
router.delete('/:cid/products/:pid', removeProductFromCartController);
router.delete('/:id', deleteCartController);

export default router;