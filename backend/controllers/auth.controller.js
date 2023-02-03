const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//? Register

authController.post('/register', async(request, response) => {
  try {
    const  isExisting = await User.findOne({email: request.body.email})
    if(isExisting){
      return response.status(404).json({message: 'Email has been already registered'})
    }
    const hashedPassword = await bcrypt.hash(request.body.password, 10)
    const user = await User.create({ ...request.body, password: hashedPassword })
    await user.save()

    const {password, ...others} = user._doc
    const token = createToken(others) 

    return response .status(201).json({others, token})
  } catch (error) {
    return response.status(500).json({error: error.message, fields: {
      username: 'STRING',
      email: 'STRING',
      password: 'STRING'
    }})
  }
}) 


//login
authController.post('/login', async(request, response) => {
  try {
    const user = await User.findOne({email: request.body.email})
    if(!user) {
      return response.status(404).json({message: 'Invalid credentials'})
    }
    const comparePassword = await bcrypt.compare(request.body.password, user.password)
    if(!comparePassword){
      return response.status(404).json({message: 'Invalid credentials'}) //! For security reasons, we should not show the field where the error is handled. 
    }

const { password, ...others } = user._doc
const token = createToken(others)

return response.status(200).json({others, token})
  } catch (error) {
    return response.status(500).json({error: error.message, fields: {
      email: 'STRING',
      password: 'STRING'
    }})
  }
})





//create token function
const createToken = (user) =>{
  const payload = {
    id: user._id.toString(),
    isAdmin: user.isAdmin
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET)
  return token 
}


module.exports = authController