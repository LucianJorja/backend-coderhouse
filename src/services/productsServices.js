import ProductsDao from "../daos/mongodb/productsDao.js";
const productsDao = new ProductsDao();

export const getAllService = async () => {
    try {
        const docs = await productsDao.getAllProducts();
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
        console.log(error);
    }
}
export const getServiceById = async () => {
    try {
        const doc = await productsDao.getProductsById(id);
        if(!doc) throw new Error ('Product not found')
        else return doc;
    } catch (error) {
        console.log(error);
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
        console.log(error);
    }
}
export const deleteServiceById = async (id) => {
    try {
        const delProduct = await productsDao.deleteProductById(id);
        return delProduct;
    } catch (error) {
        console.log(error);
    }
}


