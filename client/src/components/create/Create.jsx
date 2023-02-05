import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './create.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'


const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [country, setCountry] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(null)
  const [review, setReview] = useState(null)
  const [typeError, setTypeError] = useState(false)
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const changeImg = (e) => {
    setImg(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImg(null)
  }

  const handleCreateRoom = async (e) => {
    e.preventDefault()
    const acceptableTypes = ['apartment', 'villa', 'penthouse', 'bungalow']
    if (!acceptableTypes.includes(type)) {
      setTypeError(true)
      setTimeout(() => {
        setTypeError(false)
      }, 10 * 1000)
      return
    }

    try {
      //? The instance formData is created
      const formData = new formData()
      let filename = null
      if (img) {

        //?Check if there is an img present. If so, it creates a file name using the current date and image name.
        filename = Date.now() + img.name
        //? Creates a file name using the current date (Date.now) and the image name (img.name). It then adds the file name and the image to the formData. (formData.append)
        formData.append('filename', filename)
        formData.append('image', img)

        //? A POST request is made to the specified url, this sends the image to the server for storage. 
        await fetch('http://localhost:5000/upload/image', {
          method: 'POST',
          body: formData
        })
      }
      const response = await fetch('http://localhost:5000/room', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          country,
          type,
          photo: filename,
          price,
          review
        })
      })

      const newRoom = await response.json()
      navigate(`/typeDetail/${newRoom._id}`)


    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Room</h2>
        <form onSubmit={handleCreateRoom} encType='multipart/form-data' action="">
          <div className={classes.inputWrapper}>
            <label>Title: </label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Title...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description: </label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Description...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Country: </label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Country...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Type: </label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Type...' />
          </div>
          <div className={classes.inputWrapperImg}>
            <label className={classes.fileInputLabel} htmlFor="img">
              Image: <span>Upload here</span>
            </label>
            <input type="file" filename='img' id='img' onChange={changeImg} style={{ display: 'none' }} />
            {img && <p className={classes.imageName}>{img.name} <AiOutlineCloseCircle className={classes.icon} onClick={() => handleCloseImg()} /></p>}
          </div>
          <div className={classes.inputWrapper}>
            <label>Price :</label>
            <input type="number" step={0.01} onChange={() => { }} className={classes.input} placeholder='Price...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Review :</label>
            <input type="number" min={1} max={5} step={0.1} onChange={() => { }} className={classes.input} placeholder='Review...' />
          </div>
          <div className={classes.btnWrapper}>
            <button className={classes.submitBtn}>Create Room</button>
          </div>
        </form>
        {typeError && <div className={classes.errorMessage}>
          Wrong type! Acceptable types are - apartment, villa, penthouse and bungalow
        </div>}
      </div>
    </div>
  )
}

export default Create