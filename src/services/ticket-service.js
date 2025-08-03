import { ticketDao } from "../daos/mongoDB/ticket-dao.js"
import CustomError from "../utils/custom-error.js"
import Service from "./service.js"

class TicketService extends Service {
    constructor(dao){
        super(dao)
    }
}

export const ticketService = new TicketService(ticketDao)