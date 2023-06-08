import './db/db.js';
import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './path.js';
// import productsRouter from './routes/ProductsRouter.js';
// import cartsRouter from './routes/CartRouter.js';
// import viewsRouter from './routes/ViewsRouter.js';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/errorHandler.js';
import MongoProductsRouter from './routes/MongoProductsRouter.js'
import MongoCartRouter from './routes/MongoCartRouter.js'



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
// app.use('/products', productsRouter);
// app.use('/carts', cartsRouter);

// app.use('/', viewsRouter);
app.use('/products', MongoProductsRouter);
app.use('/carts', MongoCartRouter);




const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('A user connected');


// const arrayProducts = [];

// socketServer.on('connection', (socket) => {
//     console.log('usuario connectado', socket.id);

//     socketServer.emit('arrayProducts', arrayProducts);

//     socket.on('newProduct', (product) => {
//         arrayProducts.push(product);
//         socketServer.emit('arrayProducts', arrayProducts);
//     })

//     socket.on('deleteProduct', (index) => {
//         arrayProducts.splice(index, 1);
//         socketServer.emit('arrayProducts', arrayProducts);
//     });
// });


});