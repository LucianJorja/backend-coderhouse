import fs from 'fs';
import { __dirname } from '../path.js';


export default class ProductManager{
    
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try{
            
                const data = await fs.promises.readFile(this.path, 'utf8');
                const products = JSON.parse(data);
                return products;
        }catch(error){
            console.error(`Error loading the products ${error}`);
            }
    }   

async addProduct(product){
    try {
        const products = await this.getProducts(); 
        const newId= await this.#newId(products);
        const newProduct = {...product, id: newId};
        products.push(newProduct);
        await this.#saveProducts(products);
        return newProduct;
    } catch (error) {
        console.error(`Could not add product: ${error}`);
        return null;
    }
}

    async #newId(products){             
        const maxId = await products.reduce((acc, product) =>{
            return product.id && product.id > acc ? product.id : acc;
        }, 0);
        return maxId + 1;
    }

    async getProductById(id){
        try {
            const products = await this.getProducts();
            const product = products.find((product) => product.id === id)
            if(product){
                return product;
            }return false;
        } catch (error) {
            console.error(`Product with Id ${id} not found`);
            return null;
    }
}
    async #saveProducts(products){
        try {
            const data = JSON.stringify(products, null, 2);
            await fs.promises.writeFile(this.path, data);
        } catch (error) {
            console.error(`Could't save the products ${error}`);
        }   
    }

    async updateProduct(id, updatedProduct){
        let products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if(index !== -1){
            products[index] = {...products[index], ...updatedProduct};
            await this.#saveProducts(products);
        }else{
            console.error(`Product with Id ${id} not found`);
        }
    }

    async deleteProduct(id){
        let products = await this.getProducts();
        const index =  products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            await this.#saveProducts(products);
        } else {
            console.error(`Product with Id ${id} not found`);
        }
    }

    async getLimitedProduct(limit){
        try {
            const products = await this.getProducts();
            const limitedProducts = products.slice(0, limit);
            return limitedProducts;
        } catch (error) {
            console.error(`Error loading the products ${error}`);
            return [];
        }
    }
}



