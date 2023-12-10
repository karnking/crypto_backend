const express = require("express");
const bcrypt = require('bcrypt')

const {
    UserModel
} = require("../models/user.model");
const userRouter = express.Router()

userRouter.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
        const user_present = await UserModel.findOne({
            email
        })
        if (!user_present) {
            res.status(409).send("Email Not registered")
        } else {
            const hash_pass = user_present.password
            console.log(hash_pass, password)
            const result = await bcrypt.compare(password, hash_pass)
            if (result) {
                res.status(200).send({
                    user: user_present
                })
            } else {
                res.status(409).send("Password do not match")
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

userRouter.post('/signup', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        const user = await UserModel.findOne({
            email
        })
        if (user) {
            res.status(409).send("Email already registered")
        } else {
            bcrypt.hash(password, 4, async (err, hash) => {
                const new_user = await new UserModel({
                    username,
                    email,
                    password: hash
                })
                await new_user.save()
                res.status(200).send("Registration Successfull")
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server Error")
    }
})

userRouter.patch('/edit:id', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            _id: req.params.id
        })
        if (!user) {
            res.status(409).send("No user with this id found")
        } else {
            const updated_user = await UserModel.findOneAndUpdate({_id:req.params.id},req.body)
            res.status(200).send(updated_user)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server Error")
    }
})

module.exports = {
    userRouter
}