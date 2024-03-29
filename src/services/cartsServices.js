import CartsDao from "../daos/mongodb/managers/cartManager.js";
import { ProductsModel } from "../daos/mongodb/models/productsModels.js";
const cartsDao = new CartsDao();

export const getAllCartsService = async () => {
    try {
        const carts = await cartsDao.getAllCarts();
        return carts;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const addProductToCartService = async (productId, cartId, quantity) => {
    try {
        const [cart, product] = await Promise.all([
            cartsDao.getCartById(cartId),
            ProductsModel.findById(productId)
        ]);

        if (!cart) {
            throw new Error('cart not found');
        }

        if (!product) {
            throw new Error('product not found');
        }

        cart.products.push({
            productId: productId,
            quantity: quantity,
            price: product.price,
            stock: product.stock
        });

        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const createCartsService = async (cartData) => {
    try {
        const newCart = await cartsDao.createCart(cartData);
        if (!newCart) throw new Error('Validation failed')
        else return newCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCartByIdService = async (id) => {
    try {
        const cart = await cartsDao.getCartById(id);
        if (!cart) throw new Error('cart not found');
        else return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const updateProductQuantityService = async (cartId, productId, quantity) => {
    try {
        const updated = await cartsDao.updateProductQuantity(cartId, productId, quantity);
        return updated;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateCartProductsService = async (cartId, products) => {
    try {
        const updatedCart = await cartsDao.updateCartProducts(cartId, products);
        return updatedCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateCartService = async (id, cartData) => {
    try {
        const cart = await cartsDao.getCartById(id);
        if (!cart) {
            throw new Error('cart not found');
        } else {
            const updatedCart = await cartsDao.updateCart(id, cartData);
            return updatedCart;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const removeProductFromCartService = async (cartId, productId) =>{
    try {
        const cart = await cartsDao.removeProductFromCart(cartId, productId);
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const delCartService = async (id) => {
    try {
        const deletedCart = await cartsDao.deleteCart(id);
        return deletedCart;
    } catch (error) {
        throw new Error(error.message);
    }
}