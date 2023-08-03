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
import MongoProductsRouter from './routes/MongoProductsRouter.js'
import MongoCartRouter from './routes/MongoCartRouter.js'
import UsersRouter from './routes/UsersRouter.js'
import passport from 'passport';
import './passport/local.js'
import './passport/github.js'
import config from '../config.js';
import { isAdmin } from './middlewares/authRole.js';
import TicketRouter from './routes/TicketRouter.js'



const app = express();

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
        secret:'sessionKey',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: 'mongodb+srv://admin:12344@cluster0.lywpi16.mongodb.net/',
            ttl: 180,
        }),
    })
    )
app.use(passport.initialize());
app.use(passport.session());
    
    
app.use('/views', viewsRouter);
app.use('/users', UsersRouter);
app.use('/products', MongoProductsRouter);
app.use('/carts', MongoCartRouter);
app.use('/tickets', TicketRouter)
app.use('/admin', isAdmin)




const PORT = config.PORT || 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('A user connected');

});