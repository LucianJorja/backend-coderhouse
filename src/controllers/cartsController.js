import { getAllCartsService, createCartsService, getCartByIdService, updateProductQuantityService ,updateCartService, delCartService } from "../services/cartsServices.js";

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
        const { id } = req.body;
        const cart = await getCartByIdService(id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
}

export const updateProductQuantityController = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const updated = await updateProductQuantityService(cartId, productId);

        if (updated) {
            res.json({ message: "Product quantity updated successfully" });
        } else {
            res.status(404).json({ error: "Product not found in cart" });
        }
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

export const deleteCartController = async (req, res, next) => {
    try {
        const { id } = req.body;
        await delCartService(id);
        res.json({ message: 'Deleted Successfully!' });
    } catch (error) {
        next(error);
    }
}