//1
const mongoose = require('mongoose')

//2
const orderSchema = mongoose.Schema()

//3
module.exports = mongoose.model("order3", orderSchema)