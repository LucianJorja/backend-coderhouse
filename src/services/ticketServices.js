import { TicketManager } from "../daos/mongodb/managers/ticketManager.js";
import Services from "./classServices.js";
const ticketManager = new TicketManager();

export default class TicketService extends Services {
    constructor(){
        super(ticketManager);
    }

    async getTicket(){
        try {
            const ticket = await ticketManager.getTickets()
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserTicket(email){
        try {
            const ticket = await ticketManager.getUserTicket(email)
            return ticket;
        } catch (error) {
            console.log(error);
        }
    }

    async createTicket(ticket){
        try {
            const newTicket = await ticketManager.createTicket(ticket);
            return newTicket;
        } catch (error) {
            console.log(error);
        }
    }
}
