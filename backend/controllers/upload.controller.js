const uploadController = require('express').Router()

const multer = require('multer')
const { verifyToken } = require('../middlewares/verifyToken.middleware')

const storage  = multer.diskStorage({
  destination: (request, file, cb)  => {
    cb(null, 'public/images')
  },
  filename: (request, file, cb) => {
    cb(null, request.body.filename)
  }
})

const upload = multer({
  storage: storage
})


//!upload.single searches in the request.body for the request.body.image
uploadController.post('/image', verifyToken, upload.single('image'), async(request, response) => {
  try {
    return response.status(200).json({message: 'File uploaded succesfully'})
  } catch (error) {
    console.error(error)
  }
})

module.exports = uploadController