class ProductManager{
    
    constructor(){
        this.products = [];
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, stock ){
        const product = {
            id: this.#newId(),
            title,
            price,
            stock,
            thumbnail,
            description,
        };
        this.products.push(product);
    }

    #newId(){
        let maxId = 0;
        this.products.forEach((product) => {
            if(product.id > maxId){
                maxId = product.id;
            }
        });
        return maxId + 1;
    }

    getProductById(id){
        const product = this.#getId(id);
        if(product){
            return product;
        }else{
            console.error(`The product with id ${id} not found`);
        }
    }

    #getId(productId){
        return this.products.find((product) => product.id === productId)
    }


}

const productManager = new ProductManager();

productManager.addProduct("Traje de baño", "Un traje de baño para el verano ", 6700, '/images/trajedebaño.png', 15 );
productManager.addProduct("Remera blanca", "Una remera blanca", 4500, '/images/remerablanca.png', 10 );
productManager.addProduct("Buzo negro", "Un buzo para el frio", 9800, '/images/buzonegro.png', 5 );
console.log(productManager);
console.log(productManager.getProductById(4));