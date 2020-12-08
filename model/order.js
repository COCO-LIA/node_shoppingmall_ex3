//1
const mongoose = require('mongoose')

//2
const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product3',
        required: true
    },
    quantity:{
        type: Number,
        default: 1
    }
})

//3
module.exports = mongoose.model("order3", orderSchema)