import TicketService from "../services/ticketServices.js";
import Controllers from "./classController.js";
const ticketService = new TicketService();
import { createResponse } from "../middlewares/auth.js";
import UserManager from "../daos/mongodb/managers/userManager.js";
const userManager = new UserManager();
import CartsDao from "../daos/mongodb/managers/cartManager.js";
import { updateCartProductsService, updateProductQuantityService } from "../services/cartsServices.js";
const cartsDao = new CartsDao();
import { codeGenerator } from "../middlewares/auth.js";

export class TicketController extends Controllers {
    constructor() {
        super(ticketService);
    }

    async getTicket(req, res, next) {
        try {
            const ticket = await ticketService.getTicket()
            createResponse(res, 200, ticket);
        } catch (error) {
            next(error);
        }
    }

    async getUserTicket(req, res, next) {
        try {
            const user = await userManager.getById(req.session.passport.user);
            const ticket = await getUserTicket(user.email);
            if (!ticket) {
                res.status(404).json({ message: 'No ticket found' });
            } else if (ticket.length > 0) {
                createResponse(res, 200, ticket);
            } else {
                res.status(404).json({ message: 'No ticket found' });
            }

        } catch (error) {
            next(error);
        }
    }

    async createTicket(req, res, next) {
        try {
            const user = await userManager.getById(req.user);
            const userCart = await cartsDao.getCartById(user.cartId);
            const ticketCode = codeGenerator();
            const newDate = new Date();
            let cartAmount = 0;
            let productsRemaining = [];
            const updatedProducts = [];
            for (const product of userCart.products) {
                const { quantity, productId } = product;
                if (quantity > product.stock) {
                    const quantityRemaining = quantity - product.stock;
                    product.quantity = productId.stock;
                    productsRemaining.push({
                        quantity: quantityRemaining,
                        productId: productId,
                    });
                } else {
                    updatedProducts.push(product);
                }
                const totalPriceProduct = product.quantity * product.price;
                cartAmount += totalPriceProduct;
            }
            userCart.products = updatedProducts;
            const ticket = {
                created_at: newDate,
                code: ticketCode,
                purchaser: user.email,
                cart: userCart,
                productsRemaining: productsRemaining,
                amount: cartAmount || 0
            };
            const response = await ticketService.createTicket(ticket);
            createResponse(res, 200, response);
        } catch (error) {
            next(error);
        }
    }

    async finalizePurchase(req, res, next) {
        try {
            const cartId = req.user.cartId;
            const ticket = req.body;
            ticket.purchaser = req.user.email;
            ticket.amount = (ticket.cart);
            ticket.code = codeGenerator();

            await updateCartProductsService(cartId, ticket.productsRemaining);
            const savePurchase = await ticketService.createTicket(ticket);

            createResponse(res, 200, savePurchase);
        } catch (error) {
            next(error);
        }
    }
} 
