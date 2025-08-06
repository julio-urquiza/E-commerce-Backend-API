import ticketDao from "../daos/mongoDB/ticket-dao.js"
import Service from "./service.js"

class TicketService extends Service {
    constructor(dao){
        super(dao)
    }
}

export default new TicketService(ticketDao)