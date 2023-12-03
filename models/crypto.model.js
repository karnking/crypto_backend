const mongoose = require('mongoose')

const CryptoSchema = mongoose.model({
    name: String,
    image: String,
    bought_price: Number,
    date: String,
    tokens: Number,
    total_value: Number,
    user_id: mongoose.ObjectId,
})

export const CryptoModel = mongoose.model("crypto", CryptoSchema)