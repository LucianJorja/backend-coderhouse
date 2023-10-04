import { getAllCartsService, createCartsService, getCartByIdService , updateCartProductsService, updateProductQuantityService, addProductToCartService, updateCartService, removeProductFromCartService, delCartService } from "../services/cartsServices.js";
import { HttpResponse } from "../utils/httpResponse.js";
const httpResponse = new HttpResponse();
export const getAllCartsController = async (req, res, next) => {
    try {
        const carts = await getAllCartsService();
        httpResponse.OK(res, carts);
    } catch (error) {
        next(error);
    }
}

export const createCartController = async (req, res, next) => {
    try {
        const { userId, products } = req.body;
        const newCart = await createCartsService({ userId, products })
        httpResponse.OK(res, newCart);
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await getCartByIdService(id);
        httpResponse.OK(res, cart);
    } catch (error) {
        next(error);
    }
}

export const addProductToCartController = async (req, res, next) => {
    try {
        const { productId, cartId } = req.params;
        const {quantity} = req.body;
        if (!productId || !cartId || !quantity) {
            throw new Error('Invalid input parameters');
        }
        const exist = await getCartByIdService(cartId);
        if (!exist) {
            httpResponse.NotFound(res, 'cart not found')
        }
        const newProduct = await addProductToCartService(productId, cartId, quantity);
        httpResponse.OK(res, newProduct);
    } catch (error) {
        next(error);
    }
}

export const updateCartProductsController = async (req, res,next) => {
    try {
        const { cid } = req.paramas;
        const { products} = req.body;
        const updatedCart = await updateCartProductsService(cid, products);
        httpResponse.OK(res, updatedCart);
    } catch (error) {
        next(error);
    }
}

export const updateProductQuantityController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updated = await updateProductQuantityService(cid, pid, quantity);
        httpResponse.OK(res, updated);
    } catch (error) {
        next(error);
    }
}

export const updateCartController = async (req, res, next) => {
    try {
        const { id } = req.body;
        const { userId, products } = req.body;
        await getCartById(id);
        const updatedCart = await updateCartService({ userId, products });
        httpResponse.OK(res, updatedCart);
    } catch (error) {
        next(error);
    }
}

export const removeProductFromCartController = async (req, res, next) => {
    try {
        const { cid, pid} = req.params;
        const cart = await removeProductFromCartService(cid, pid);
        httpResponse.OK(res, cart);
    } catch (error) {
        next(error);
    }
}

export const deleteCartController = async (req, res, next) => {
    try {
        const { id } = req.body;
        await delCartService(id);
        httpResponse.OK(res, { message: 'Deleted Successfully!' })
    } catch (error) {
        next(error);
    }
}