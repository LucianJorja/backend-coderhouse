import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const products = await productManager.getLimitedProduct(limit);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await productManager.getProductById(Number(id));
        if (product) {
            res.status(200).json(product);
        } else{
            console.error(`Product with Id ${id} not found`);
            
        }
    } catch (error) {   
        console.error(`Product with Id ${id} not found`);
    }
})



const PORT = 8080

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

