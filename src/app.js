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
import MessagesRouter from './routes/MessagesRouter.js'
import { getAllMsgController, createMsgController } from "./controllers/messagesControllers.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
// app.use('/products', productsRouter);
// app.use('/carts', cartsRouter);

// app.use('/', viewsRouter);
app.use('/products', MongoProductsRouter);
app.use('/carts', MongoCartRouter);
app.use('/', MessagesRouter);

app.use(errorHandler);

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

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

socketServer.on('connection', async (socket) => {
    console.log('A user connected');

    socketServer.emit('messages', await getAllMsgController());

    socket.on('disconnect', () => {
        console.log('¡🔴 User disconnect!');
    });

    socket.on('newUser', (user) => {
        console.log(`${user} is logged in`);
    });

    socket.on('chat:message', async (msg) => {
        try {
            const req = { body: msg };
            const res = { json: () => { } };
            await createMsgController(req, res, () => { });
            socketServer.emit('messages', await getAllMsgController(req, res, () => { }));
        } catch (error) {
            console.log(error);
        }
    });


    socket.on('newUser', (user) => {
        socket.broadcast.emit('newUser', user);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    })
});