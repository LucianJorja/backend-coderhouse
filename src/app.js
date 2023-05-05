import express from 'express';
import productsRouter from './routes/ProductsRouter.js'
import cartsRouter from './routes/CartRouter.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
const PORT = 8080

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

