import ProductsDao from "../daos/mongodb/managers/productManager.js";
const productsDao = new ProductsDao();

export const getAllService = async (page, limit, queryOptions, sortOptions) => {
    try {
        const query = {};
        if (queryOptions.category){
            query.category = { $regex: queryOptions.category, $options: 'i' };
        }
        
        const docs = await productsDao.getAllProducts(query, page, limit, sortOptions);
        return docs;
    } catch (error) {
        console.log(error);
    }
}
export const createService = async (obj) => {
    try {
        const newProduct = await productsDao.createProduct(obj);
        if (!newProduct) throw new Error ('Validation Error')
        else return newProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getServiceById = async (id) => {
    try {
        const doc = await productsDao.getProductsById(id);
        if(!doc) throw new Error ('Product not found')
        else return doc;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const updateService = async (id, obj) => {
    try {
        const doc = await productsDao.getById(id);
        if(!doc){
            throw new Error ('Product not found')
        }else{
            const productUpdated = await productsDao.updateProduct(id, obj);
            return productUpdated;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}
export const deleteServiceById = async (id) => {
    try {
        const delProduct = await productsDao.deleteProductById(id);
        return delProduct;
    } catch (error) {
        throw new Error(error.message);
    }
}


