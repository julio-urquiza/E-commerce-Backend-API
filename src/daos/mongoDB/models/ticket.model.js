import mongoose from "mongoose"

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
            },
            quantity: {
            type: Number,
            required: true
            }
        }
    ]
})

export const ticketModel = mongoose.model("ticket", TicketSchema)
