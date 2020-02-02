const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        default: 25
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)