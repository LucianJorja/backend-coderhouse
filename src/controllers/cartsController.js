import { getAllCartsService, createCartsService, getCartByIdService , updateCartProductsService, updateProductQuantityService, addProductToCartService, updateCartService, removeProductFromCartService, delCartService } from "../services/cartsServices.js";

export const getAllCartsController = async (req, res, next) => {
    try {
        const carts = await getAllCartsService();
        res.json(carts);
    } catch (error) {
        next(error);
    }
}

export const createCartController = async (req, res, next) => {
    try {
        const { userId, products } = req.body;
        const newCart = await createCartsService({ userId, products })
        res.json(newCart);
    } catch (error) {
        next(error);
    }
}

export const getCartByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await getCartByIdService(id);
        res.json(cart);
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
            throw new Error('Cart not found');
        }
        const newProduct = await addProductToCartService(productId, cartId, quantity);
        res.json(newProduct);

    } catch (error) {
        next(error);
    }
}

export const updateCartProductsController = async (req, res,next) => {
    try {
        const { cid } = req.paramas;
        const { products} = req.body;
        const updatedCart = await updateCartProductsService(cid, products);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export const updateProductQuantityController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updated = await updateProductQuantityService(cid, pid, quantity);
        res.json(updated);
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
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
}

export const removeProductFromCartController = async (req, res, next) => {
    try {
        const { cid, pid} = req.params;
        const cart = await removeProductFromCartService(cid, pid);
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

export const deleteCartController = async (req, res, next) => {
    try {
        const { id } = req.body;
        await delCartService(id);
        res.json({ message: 'Deleted Successfully!' });
    } catch (error) {
        next(error);
    }
}