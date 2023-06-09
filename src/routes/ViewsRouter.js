import { Router } from "express";
const router = Router();
// import { __dirname } from "../path.js";
// import ProductManager from "../manager/ProductsManager.js";
// const productsManager = new ProductManager(__dirname + '/fs/products.json');


// router.get('', async (req, res) => {
//     const products  = await productsManager.getProducts();
//     res.render('home', {products});
// });

// router.get('/realTimeProducts', async (req, res) => {
//     const products = await productsManager.getProducts();
//     res.render('realTimeproducts', {products});
// })

// router.post('/addProduct', async (req, res) => {
//     try {
//         const product = {
//             name: req.body.name,
//             price: req.body.price,
//             description: req.body.description
//         };
//         const newProduct = await productsManager.addProduct(product);
//         if (newProduct) {
//             const id = newProduct.id;
//             res.send({ id: newProduct.id });
//             socketServer.emit('newProductId', id); 
//         } else {
//             res.status(500).send('Could not add product');
//         }
//     } catch (error) {
//         console.error(`Error adding product: ${error}`);
//         res.status(500).send('Could not add product');
//     }
// });

router.get('/', (req, res) =>{
    res.render('login')
})
router.get('/register', (req, res) =>{
    res.render('register')
})
router.get('/error-register', (req, res) =>{
    res.render('errorRegister')
})
router.get('/error-login', (req, res) =>{
    res.render('errorLogin')
})
router.get('/products', (req, res) =>{
    const user = req.user;
    const { firstName, lastName, email, age } = user;
    res.render('products', {firstName, lastName, email, age})
})
router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/views')
})
router.get('/profile-github', (req, res) =>{
    res.render('profile')
})


export default router;


