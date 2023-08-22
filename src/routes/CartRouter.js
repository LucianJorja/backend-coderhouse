import { Router } from "express";
import { getAllCartsController, createCartController, getCartByIdController, updateProductQuantityController, addProductToCartController ,removeProductFromCartController, updateCartController, deleteCartController, updateCartProductsController } from "../controllers/cartsController.js";
import { cartValidator} from "../middlewares/cartValidator.js";
const router = Router();


router.get('/', getAllCartsController);
router.get('/:id', getCartByIdController);
router.post('/', createCartController);
router.post('/:cartId/products/:productId', cartValidator, addProductToCartController);
router.put('/:cid/products/:pid', updateProductQuantityController);
router.put('/:cid', updateCartProductsController);
router.put('/:id', updateCartController);
router.delete('/:cid/products/:pid', removeProductFromCartController);
router.delete('/:id', deleteCartController);

export default router;