import { ticketModel } from "./models/ticket.model.js"
import MongoDao from "./mongo-dao.js"

class TicketDao extends MongoDao {
    constructor(model) {
        super(model);
    }
}

export default new TicketDao(ticketModel)