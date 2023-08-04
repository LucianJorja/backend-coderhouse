import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    cart: [
        {_id: {type: mongoose.Schema.Types.ObjectId, ref: 'carts', required: true},
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
            price: {
                type: Number,
                required: true
            },
            stock: {
                type: Number,
                required: true
            }
        }]}
    ],
    amount: { type: Number, required: false },
    purchaser: { type: String, required: true },
});

ticketSchema.pre('find', function () {
    this.populate('carts');
});
ticketSchema.pre('find', function(){
    this.populate('products')
})



export const TicketModel = mongoose.model("ticket", ticketSchema);