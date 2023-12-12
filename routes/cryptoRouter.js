const express = require('express')
const { CryptoModel } = require('../models/crypto.model')
const { UserModel } = require('../models/user.model')

const CryptoRouter = express.Router()

CryptoRouter.post('/buy', async (req, res) => {
    try {
        const {
            crypto_id,
            name,
            image,
            bought_price,
            date,
            tokens,
            total_value,
            user_id
        } = req.body
        const crypto_bought = await CryptoModel.findOne({user_id,crypto_id})
        if(crypto_bought){
            const {_id} = crypto_bought
            let newTokens = crypto_bought.tokens+tokens
            let newb = ((crypto_bought.bought_price * crypto_bought.tokens)+(tokens*bought_price))/newTokens
            let total_value_n = Math.round(newTokens*newb *100)/100
            const newCrypto = await CryptoModel.findByIdAndUpdate({
              _id
            },{tokens:newTokens,bought_price:newb,total_value:total_value_n})
            res.status(200).json(newCrypto)
        }else{
            const newCrypto = await CryptoModel(req.body)
            newCrypto.save()
            res.status(200).json(newCrypto)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})
CryptoRouter.get('/allCrypto/:userid',async(req,res)=>{
    try {
        const {userid} = req.params
        const cryptos = await CryptoModel.find({user_id:userid})
        console.log(cryptos)
        if(cryptos.length>0) res.status(200).json({cryptos})
        else res.status(409).send("No Crypto Found")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = {CryptoRouter}