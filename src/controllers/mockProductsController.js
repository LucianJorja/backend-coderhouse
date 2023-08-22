import * as mockProductsService from '../services/mockingProductsService.js'

export const createProductMock = async (req, res) => {
    const {cant } = req.query;
    try {
        const response = await mockProductsService.createProductMock(cant);
        res.status(200).json({ products: response });
    } catch (error) {
        console.log(error);
    }
}

export const getProductsMock = async (req, res) => {
    try {
        const response = await mockProductsService.getProductsMock();
        res.status(200).json({ products: response });
    } catch (error) {
        console.log(error);
    }
}