import MongoDao from "../mongoDao.js";
import { TicketModel } from "../models/ticketModel.js";


export class TicketManager extends MongoDao {
    constructor() {
        super(TicketModel);
    }

    async getTickets() {
        try {
            const ticket = await this.model.find({});
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserTicket(email){
        try {
            const ticket = await this.model.find({
                purchaser : email
            })
            return ticket;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createTicket(ticket){
        try {
            const newTicket = await this.model.create(ticket)
            return newTicket;
        } catch (error) {
            throw new Error(error.message);
            
        }
    }
}
