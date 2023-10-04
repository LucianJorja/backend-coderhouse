import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import { TicketController } from "../controllers/ticketController.js";

const router = new Router();
const ticketController = new TicketController();

router.get('/', ticketController.getTicket );
router.get('/:cid/tickets', ticketController.getUserTicket);
router.post('/', checkAuth, ticketController.createTicket);
router.post('/finalizePurchase', checkAuth, ticketController.finalizePurchase);

export default router;