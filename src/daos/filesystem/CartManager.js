import fs from 'fs';
import { __dirname } from '../path.js';


export default class CartManager{

    constructor(path){
        this.cartPath = path;
    }

    async getCarts(){
        try {
            if (fs.existsSync(this.cartPath)) {
                const data = await fs.promises.readFile(this.cartPath, 'utf8' );
                const carts = JSON.parse(data);
                    return carts;
            }
            return []
            }
        catch (error) {
            console.error(`Could not load carts: ${error}`);
            return [];
        }
    }
    async addCart(cart){
        try {
            const carts = await this.getCarts();
            const newId = await this.#newId(carts);
            const newCart = {
                id : newId,
                products: []
            };
            carts.push(newCart);
            await this.#saveCarts(carts);
            return newCart;
        } catch (error) {
            console.error(`Could not add cart: ${error}`);
            return null;
        }
    }

    async addProductToCart(cartId, idProd) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(c => c.id === cartId);
            if (!cart) {
                console.error(`Cart with id ${cartId} not found`);
            return null;
            }
            const prodExistant = cart.products.find(p => p.id === idProd);
            if (prodExistant) {
                prodExistant.quantity++;
            } else {
                cart.products.push({ id: idProd, quantity: 1 });
            }
            await this.#saveCarts(carts);
            return cart;
        } catch (error) {
            console.error(`Couldn't save product to cart: ${error}`);
            return null;
        }
    }

    // async addProductToCart(cartId, idProd){
    //     try {
    //         const cart = await this.getCartById(cartId);
    //         if (!cart) {
    //             console.error(`Cart with id ${cartId} not found`);
    //             return null;
    //         }
    //         const prodExistant = cart.products.find(p => p.id === idProd);
    //         if (prodExistant) {
    //             prodExistant.quantity++;
    //         } else {
    //             cart.products.push({ id: idProd, quantity: 1 });
    //         }
    //         await this.#saveCarts(await this.getCarts());
    //         return cart;
    //     } catch (error) {
    //         console.error(`Couldn't save product to cart: ${error}`);
    //         return null;
    //     }
    // }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts();
            const cart = carts.find((cart) => cart.id === cartId);
            if (cart) {
                return cart;
            }
            return null;
        } catch (error) {
            console.error(`Couldn't get cart with id ${id}: ${error}`);
            return null;
        }
    }
    
    async #newId(carts) {
        const maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
        return maxId + 1;
    }

    async #saveCarts(carts) {
        try {
            console.log('cart:', carts);
            const data = JSON.stringify(carts, null, 2);
            await fs.promises.writeFile(this.cartPath, data, 'utf-8');
            console.log('Cart saved successfully');
        } catch (error) {
            console.error(`Could not save carts: ${error}`);
        }
    }
}