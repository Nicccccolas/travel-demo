const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('./controllers/auth.controller')
const roomController = require('./controllers/room.controller')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8005

//! connect database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('DB is succesfully connect'))


//? Middlewares
//THOSE TWO ARE A MUST IF YOU USE REQ.BODY
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/room', roomController)



//? Start our server
app.listen(PORT, () => 
console.log(`Server is running on PORT ${PORT}`)) 
