import mongoose from "mongoose";


const mockingProducts = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    description: {type: String, required: true},
    price: {type: Number, required: true,},
    category: {type: String, required: true}
});

export const MockingProducts = mongoose.model('mockingDB',  mockingProducts);
