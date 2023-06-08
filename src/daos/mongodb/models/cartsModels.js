import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
        quantity:{  
            type: Number,
            required: true,
            default: 1,
        },
    }]
});

cartSchema.pre('find', function(){
    this.populate('products')
})



export const CartModel = mongoose.model('cart', cartSchema);