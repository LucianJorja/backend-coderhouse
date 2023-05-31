import { CartModel } from "./models/cartsModels.js";

export default class CartsDao {
    async getAllCarts() {
        try {
            const cart = await CartModel.find();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(cartData) {
        try {
            const cart = await CartModel.create(cartData);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async getCartById(id) {
        try {
            const cart = await CartModel.findById(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductQuantity(cartId, productId) {
        try {
            const productExists = await CartModel.exists({
                _id: cartId,
                "products.productId": productId
            });

            if (productExists) {
                await CartModel.updateOne(
                    { _id: cartId, "products.productId": productId },
                    { $inc: { "products.$.quantity": 1 } }
                );
                return true;
            }

            return false;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCart(id, cartData) {
        try {
            const updatedCart = await CartModel.findByIdAndUpdate({ _id: id }, cartData);
            return updatedCart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(id) {
        try {
            await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}