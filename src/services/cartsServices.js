import CartsDao from "../daos/mongodb/managers/cartManager.js";
const cartsDao = new CartsDao();

export const getAllCartsService = async () => {
    try {
        const carts = await cartsDao.getAllCarts();
        return carts;
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCartService = async (productId, cartId, quantity) => {
    try {
        const cart = await cartsDao.getCartById(cartId);
        if (!cart) {
            throw new Error('cart not found');
        }
        const existingProductOnCart = cart.products.findIndex((product) => product.productId === productId);
        if (!existingProductOnCart == -1) {
            cart.products[existingProductOnCart].quantity += quantity;
        }else{
            cart.products.push({
                productId: productId,
                quantity: quantity,
            });
        }

        await cart.save();
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const createCartsService = async (cartData) => {
    try {
        const newCart = await cartsDao.createCart(cartData);
        if (!newCart) throw new Error('Validation failed')
        else return newCart;
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIdService = async (id) => {
    try {
        const cart = await cartsDao.getCartById(id);
        if (!cart) throw new Error('cart not found');
        else return cart;
    } catch (error) {

    }
}


export const updateProductQuantityService = async (cartId, productId, quantity) => {
    try {
        const updated = await cartsDao.updateProductQuantity(cartId, productId, quantity);
        return updated;
    } catch (error) {
        console.log(error);
    }
}

export const updateCartProductsService = async (cartId, products) => {
    try {
        const updatedCart = await cartsDao.updateCartProducts(cartId, products);
        return updatedCart;
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
}

export const removeProductFromCartService = async (cartId, productId) =>{
    try {
        const cart = await cartsDao.removeProductFromCart(cartId, productId);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export const delCartService = async (id) => {
    try {
        const deletedCart = await cartsDao.deleteCart(id);
        return deletedCart;
    } catch (error) {
        console.log(error);
    }
}