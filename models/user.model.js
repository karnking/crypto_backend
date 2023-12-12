const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    amount: {
        type: Number,
        default: 0
    },
    portfolio: {
        type: [],
        default: []
    },
    profit: Number,
    money_added_date: String
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = {
    UserModel
}