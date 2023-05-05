import { Router } from "express";
const router = Router();
import CartManager from "../manager/CartManager.js";
const cartManager = new CartManager();

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.status(200).json(carts);
    } catch (error) {
        console.error(`Error getting carts: ${error}`);
        res.status(500).send('Server error');
    }
})

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.addCart();
        res.status(200).json(cart);
    } catch (error) {
        console.error(`Error creating cart: ${error}`);
        res.status(500).send('Server error');
    }
})

router.get('/:id', async (req, res) => {
    try {
        const cartId = parseInt(req.params.id);
        const cart = await cartManager.getCartById(cartId);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        console.error(`Error getting cart: ${error}`);
        res.status(500).send('Server error');
    }
})

router.post('/:cartId/product/:idProd', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cartId);
        const idProd = parseInt(req.params.idProd);
        const cart = await cartManager.addProductToCart(cartId, idProd);
        if (cart) {
            res.status(200).json(cart);
        }else{
            res.status(404).send('Cart not found');
        }
    } catch (error) {
        console.error(`Error adding product to cart: ${error}`);
        res.status(500).send('Server error');
    }
})

export default router;
