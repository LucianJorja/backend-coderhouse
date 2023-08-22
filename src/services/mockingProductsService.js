import { MockingProducts } from "../daos/mongodb/models/mockingProductsModel.js";
import { generateProducts } from "../middlewares/auth.js";

export const createProductMock = async (cant = 100) => {
    const productsArray = [];
    for (let i = 0; i < cant; i++) {
        const product = generateProducts();
        productsArray.push(product);
    }
    const products = await MockingProducts.create(productsArray);
    return products;
}
export const getProductsMock = async () => {
    try {
        const products = await MockingProducts.find({});
        return products;
    } catch (error) {
        throw new Error(error.message);
    }
}