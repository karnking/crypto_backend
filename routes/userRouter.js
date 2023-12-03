const express = require("express");
const bcrypt = require('bcrypt')

const { UserModel } = require("../models/user.model");
const userRouter = express.Router()

userRouter.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user_present = await UserModel.findOne({email})
        if(!user_present){
            req.status(409).send("Email Not registered")
        }else{
            const hash_pass = user_present.password
            const result = bcrypt.compareSync(req.body.password,hash_pass)
            if(!result){
                req.status(409).send("Password do not match")
            }else{
                res.status(200).send({user:user_present})
            }
        }
    }catch(error){
        console.log(error)
        req.status(500).send("Internal Server Error")
    }
})

userRouter.post('/signup',async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = UserModel.findOne({email})
        if(user){
            res.status(409).send("Email already registered")
        }else{
            bcrypt.hash(password,4,async(err,hash)=>{
                const new_user = await new UserModel({
                    username,
                    email,
                    password
                })
                await new_user.save()
                res.status(200).send("Registration Successfull")
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).send("Internal server Error")
    }
})

module.exports = {userRouter}
