import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products:[{
        productId:{
            type: String,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            default: 1,
        },
    }]
});

export const CartModel = mongoose.model('cart', cartSchema);