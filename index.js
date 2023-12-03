const express = require('express')
const {connection} = require('./config/db')
const cors = require('cors')
const { userRouter } = require('./routes/userRouter')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("base endpoint")
})

app.use('/user',userRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        .then(res=>console.log("Connection successfull"))
    }catch(error){
        console.log("Connection unsuccessfull")
        console.log(error)
    }
})