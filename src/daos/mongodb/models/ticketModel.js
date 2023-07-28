import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'carts' },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
});

export const TicketModel = mongoose.model("ticket", ticketSchema);