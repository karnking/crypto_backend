const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@cluster0.uibmoog.mongodb.net/cryptosphere?retryWrites=true&w=majority`)

module.exports = {connection}