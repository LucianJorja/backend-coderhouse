import { Router } from "express";
const router = Router();
import { __dirname } from '../path.js';
import ProductManager from '../manager/ProductsManager.js';
const productManager = new ProductManager(__dirname + '/fs/products.json');


router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit || 0;
        if (limit > 0) {
            const products = await productManager.getLimitedProduct(limit);
            res.status(200).json(products);
        } else {
            const allProducts = await productManager.getProducts();
            res.status(404).json(allProducts);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
    
})

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const products = req.body;
        const newProduct = await productManager.addProduct(products);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const  id  = Number(req.params.id);
        const updatedProduct = req.body;
        const product = await productManager.getProductById(id);
        if(product){
            await productManager.updateProduct(id, updatedProduct);
            res.status(200).json({ message: `Products with id: ${id} updated successfully`})
        }else{
            res.status(404).json({ message: `Product with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ message: `Error updating product with ID ${id}: ${error.message}` });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id }= req.params;
        const product = await productManager.getProductById(Number(id));
        if (product) {
            res.status(200).json({ message: 'Product found' , product});
        } else{
            res.status(400).send('Product not found');            
        }
    } catch (error) {   
        res.status(404).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = await productManager.getProducts();
            if (products.length > 0) {
                await productManager.deleteProduct(Number(id));
                res.send(`product with the id: ${id} deleted successfully`)
            } else {
                res.send(`product with the id: ${id} not found`);
            }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router;

