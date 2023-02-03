const Room = require('../models/Room')
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken.middleware')
const { request, response } = require('express')
const roomController = require('express').Router()

//getAll
roomController.get('/', verifyToken, async (request, response) => {
  try {
    const type = request.query.type
    let rooms

    if (type) {
        rooms = await Room.find({type: type}).limit(15)
    } else {
      rooms = await Room.find({}).limit(15)
    }
    return response.status(200).json(rooms)
  } catch (error) {
    console.log(error.message)
  }
})

// getOneRoom

roomController.get('/find/:id', verifyToken, async(request, response) => {
  try {
    const id = request.params.id
    const room = await Room.findById(id)

    return response.status(200).json(room)
  } catch (error) {
    console.log(error.message)
    
  }
})

// create
roomController.post('/', verifyTokenAdmin, async(request, response) => {
  try {
    const createdRoom = await Room.create(request.body)
    
    return response.status(201).json(createdRoom)
  } catch (error) {
    console.log({error: error.message, fields: {
      title: 'STRING', 
      description: 'STRING', 
      price: 'NUMBER', 
      country: 'STRING', 
      photo: 'STRING', 
      type: 'STRING', 
      review: 'NUMBER'
    }})
  }
})

// update
roomController.put('/:id', verifyTokenAdmin, async(request, response) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true})
    
      return response.status(200).json(updatedRoom)
    } catch (error) {
      console.log(error.message)
    }
})

// delete
roomController.delete('/:id', verifyTokenAdmin, async(request, response) => {
  try {
    await Room.findByIdAndDelete(request.params.id)
    return response.status(200).json({message: 'Succesfully deleted room'})
  } catch (error) {
    console.log(error.message)
  }
})

// book
roomController.put('/bookRoom/:id', verifyToken, async(request, response) => {
  try {
    const { unavailableDates } = request.body
    const room = await Room.findById(request.params.id)

    room.unavailableDates = room.unvailableDates.concat(unavailableDates)
    await room.save()
    return response.status(200).json(room)
  } catch (error) {
    console.log(error.message)
  }
})


module.exports = roomController