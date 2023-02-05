const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authController = require('./controllers/auth.controller')
const roomController = require('./controllers/room.controller')
const uploadController = require('./controllers/upload.controller')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8005

//! connect database
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () => console.log('DB is succesfully connect'))

//! http://localhost:5000/images/FILENAME
//? Middlewares
//THOSE TWO ARE A MUST IF YOU USE REQ.BODY
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authController)
app.use('/room', roomController)
app.use('/upload', uploadController)


//? Start our server
app.listen(PORT, () => 
console.log(`Server is running on PORT ${PORT}`)) 
