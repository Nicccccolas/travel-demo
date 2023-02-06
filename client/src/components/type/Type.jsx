import React, { useEffect, useState } from 'react'
import classes from './type.module.css'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'
// import img1 from '../../assets/img9.jpg'

const Type = () => {
  const [estates, setEstates] = useState([])
  const { type } = useParams()
  const { token } = useSelector((state) => state.auth)


  useEffect(() => {
    const fetchTypeRooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/room?type=${type}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const estates = await response.json()
        setEstates(estates)

      } catch (error) {
        console.error(error)
      }
    }
    fetchTypeRooms()
  }, [type])

  console.log(estates)

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>All {type}s</h5>
          <h2 className={classes.title}>Pick from the best {type}s</h2>
        </div>
        <div className={classes.places}>
          {estates.map((estate) => (
            <Link to={`/typeDetail/${estate._id}`} className={classes.place} key={estate._id}>
              <div className={classes.imgWrapper}>
                <img src={`http://localhost:5000/images/${estate.photo}`} alt="" />
              </div>
              <div className={classes.titleAndReview}>
                <span>{estate.title}</span>
                <span className={classes.review}> <AiFillStar className={classes.icon}/>{estate.review}</span>
              </div>
              <div className={classes.countryAndPrice}>
                <span>Country: <span>{estate.country}</span></span>
                <span className={classes.price}>Price: <span>{estate.price}$ / <span>per person</span></span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Type