const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    title: String,
    duration: String,
    status: String,
    img: String,
    reviews: Number,
    price: Number
}, {
    timestamps: true
})

module.exports = mongoose.model('Tour', tourSchema)