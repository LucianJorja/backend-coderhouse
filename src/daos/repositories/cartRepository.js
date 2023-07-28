import { CartModel } from "../models/cartsModels.js";

export const getCartById = async (id) => {
    return await CartModel.findById(id);
};

export const createCart = async (cartData) => {
    return await CartModel.create(cartData);
};
