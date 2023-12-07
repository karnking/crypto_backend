const express = require('express')
const { CryptoModel } = require('../models/crypto.model')

const CryptoRouter = express.Router()

CryptoRouter.post('/buy', async (req, res) => {
    try {
        const {
            name,
            image,
            bought_price,
            date,
            tokens,
            total_value,
            user_id
        } = req.body
        const crypto_bought = await CryptoModel.findOne({user_id,name})
        if(crypto_bought){
            CryptoModel.findByIdAndUpdate({
                
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})