import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productsSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true},
    description: {type: String, required: true},
    price: {type: Number, required: true,},
    stock: {type: Number, required: true},
    category: {type: String, required: true},
    owner: {type: String, default:'admin'}
});

productsSchema.plugin(mongoosePaginate);

export const ProductsModel = mongoose.model('products', productsSchema);
