import { Router } from "express";
const router = Router();
import { __dirname } from "../path.js";
import ProductManager from "../manager/ProductsManager.js";
const productsManager = new ProductManager(__dirname + '/fs/products.json');


router.get('', async (req, res) => {
    const products  = await productsManager.getProducts();
    res.render('home', {products});
});

router.get('/realTimeProducts', async (req, res) => {
    const products = await productsManager.getProducts();
    res.render('realTimeproducts', {products});
})

router.post('/addProduct', async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };
        const newProduct = await productsManager.addProduct(product);
        if (newProduct) {
            const id = newProduct.id;
            res.send({ id: newProduct.id });
            socketServer.emit('newProductId', id); 
        } else {
            res.status(500).send('Could not add product');
        }
    } catch (error) {
        console.error(`Error adding product: ${error}`);
        res.status(500).send('Could not add product');
    }
});



export default router;


