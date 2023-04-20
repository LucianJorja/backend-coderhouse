const fs  = require('fs')


class ProductManager{
    
    constructor(){
        this.path = './products.json';
    }

    getProducts(){
        try{
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        }catch(error){
            console.error(`Error cargando los products de ${error}`);
            return [];
        }
    }

    addProduct(product ){
        const products = this.getProducts(); 
        product.id = this.#newId(products);
        products.push(product);
        this.#saveProducts(products);
    }

    #newId(products){
        const maxId = products.reduce((acc, product) =>{
            return product.id > acc ? product.id : acc;
        }, 0);
        return maxId + 1;
    }

    getProductById(id){
        const products = this.getProducts();
        const product = products.find((product) => product.id === id)
        if(product){
            return product;
        }else{
            console.error(`El products con el id ${id} not found`);
        }
    }

    #saveProducts(products){
        try {
            const data = JSON.stringify(products, null, 2);
            fs.writeFileSync(this.path, data, 'utf8');
        } catch (error) {
            console.error(`No se ha podido guardar los productos al archivo : ${error}`);
        }
    }

    updateProduct(id, updatedProduct){
        let products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if(index !== -1){
            products[index] = {...products[index], ...updatedProduct};
            this.#saveProducts(products);
        }else{
            console.error(`El products con el id ${id} not found`);
        }
    }

    deteteProduct(id){
        let products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products.splice(index, 1);
            this.#saveProducts(products);
        } else {
            console.error(`El products con el id ${id} not found`);
        }
    }


}

const productManager = new ProductManager();

productManager.addProduct({
    title: 'Producto 3',
    price: 6500,
    stock: 20,
    thumbnail: 'https://example.com/product3.jpg',
    description: 'Descripción del producto 3'
});

productManager.updateProduct(2, {
    title: 'Producto actualizado 1 ',
    price: 5500,
    stock: 15,
    thumbnail: 'https://example.com/updated-product1.jpg',
    description: 'Descripción del producto actualizado 1'
})

const product = productManager.getProductById(4);
console.log(product);

productManager.deteteProduct(4);

const products = productManager.getProducts();
console.log(products);