import { ProductsModel } from "../models/productsModels.js";

export default class ProductsDao{

    async getAllProducts(query, page = 1, limit = 10, sortOptions) {
        try {
            const response = await ProductsModel.paginate(query , { page, limit, sort: sortOptions});
            return response
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async createProduct(obj) {
        try {
            const response = await ProductsModel.create(obj)
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async updateProduct(id, obj) {
        try {
            await ProductsModel.updateOne({_id: id}, obj);
            return obj;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    async getProductsById(id) {
        try {
            const response = await ProductsModel.findById(id);
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    

    async deleteProductById(id) {
        try {
            const response = await ProductsModel.findByIdAndDelete(id);   
            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
}
