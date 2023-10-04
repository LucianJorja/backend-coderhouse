import { logger } from "../../../utils/logger.js";
import { CartModel } from "../models/cartsModels.js";

export default class CartsDao {
    async getAllCarts() {
        try {
            const cart = await CartModel.find({})
            return cart;
        } catch (error) {
            logger.error(error.message)
        }
    }

    async createCart(cartData) {
        try {
            const cart = await CartModel.create(cartData);
            return cart;
        } catch (error) {
            logger.error(error.message)
        }
    }

    async getCartById(id) {
        try {
            const cart = await CartModel.findById(id)
                .populate('products')
            return cart;
        } catch (error) {
            logger.error(error.message)
        }
    }

    async updateCartProducts(cartId, products) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('cart not found');
            }

            cart.products = products;
            await cart.save();
            return cart;
        } catch (error) {
            logger.error(error.message)
        }
    }


    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) throw new Error('Cart not found');
            const product = cart.products.find((p) => p.productId.toString() === productId);
            if (!product) throw new Error('Product not found in the cart');

            product.quantity = quantity;

            await cart.save();
            return cart;
        } catch (error) {
            logger.error(error.message)
        }
    }

    async addProductToCart(productId, cartId) {
        try {
            const products = await CartModel.findById(cartId);
            cart.products.push(productId);
            products.save();
        } catch (error) {
            logger.error(error.message)
        }
    }

    async updateCart(id, cartData) {
        try {
            const updatedCart = await CartModel.findByIdAndUpdate({ _id: id }, cartData);
            return updatedCart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            if (!cart) {
                throw new Error('cart not found');
            }

            cart.products = cart.products.filter((product) => product.productId.toString() !== productId);

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteCart(id) {
        try {
            await CartModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}