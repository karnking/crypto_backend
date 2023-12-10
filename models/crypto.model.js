const mongoose = require('mongoose')

const CryptoSchema = mongoose.Schema({
    name: String,
    image: String,
    bought_price: Number,
    date: String,
    tokens: Number,
    total_value: Number,
    user_id: mongoose.ObjectId,
})

const CryptoModel = mongoose.model("crypto", CryptoSchema)

module.exports = {CryptoModel}