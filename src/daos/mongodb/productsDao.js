import { ProductsModel } from "./models/productsModels.js";

export default class ProductsDao{

    async getAllProducts() {
        try {
            const response = await ProductsModel.find({});
            return response
        } catch (error) {
            console.log(error);
        }
    }
    
    async createProduct(obj) {
        try {
            const response = await ProductsModel.create(obj)
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    async updateProduct(id, obj) {
        try {
            await ProductsModel.updateOne({_id: id}, obj);
            return obj;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getProductsById(id) {
        try {
            const response = await ProductsModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    

    async deleteProductById(id) {
        try {
            const response = await ProductsModel.findByIdAndDelete(id);   
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
}
