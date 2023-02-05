import React from 'react'
import navigate from 'react-router-dom'
import classes from './create.module.css'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Create = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [country, setCountry] = useState('')
  const [type, setType] = useState('')
  const [price, setPrice] = useState(null)
  const [review, setReview] = useState(null)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleCreateRoom = async (e) => {

  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapped}>
        <h2 className={classes.title}>Create Room</h2>
        <form onSubmit={handleCreateRoom} encType='multipart/form-data' action="">
          <div className={classes.inputWrapper}>
            <label>Title</label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Title...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Description</label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Description...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Country</label>
            <input type="text" onChange={() => { }} className={classes.input} placeholder='Country...' />
          </div>
          <div className={classes.inputWrapper}>
            <label>Type</label>
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