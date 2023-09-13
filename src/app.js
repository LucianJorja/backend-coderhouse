import './daos/mongodb/db/db.js';
import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './path.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import viewsRouter from './routes/ViewsRouter.js';
import { Server } from 'socket.io';
import { errorHandler } from './middlewares/errorHandler.js';
import ProductsRouter from './routes/ProductsRouter.js'
import CartRouter from './routes/CartRouter.js'
import UsersRouter from './routes/UsersRouter.js'
import passport from 'passport';
import './passport/local.js'
import './passport/github.js'
import config from '../config.js';
import { isAdmin } from './middlewares/authRole.js';
import TicketRouter from './routes/TicketRouter.js'
import MockProductsRouter from './routes/MockProductRouter.js'
import loggerTest from './routes/Router.js';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {info} from './docs/info.js'


const app = express();
const specs = swaggerJSDoc(info);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(
    session({
        secret: 'sessionKey',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://admin:12344@cluster0.lywpi16.mongodb.net/',
            ttl: 180,
        }),
    })
    );
app.use(passport.initialize());
app.use(passport.session());
    
app.use('/views', viewsRouter);
app.use('/users', UsersRouter);
app.use('/products', ProductsRouter);
app.use('/carts', CartRouter);
app.use('/tickets', TicketRouter);
app.use('/mockingProducts', MockProductsRouter);
app.use('/admin', isAdmin);
app.use('/loggerTest', loggerTest);

const PORT = config.PORT || 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('A user connected');

});