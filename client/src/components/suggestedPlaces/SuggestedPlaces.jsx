import React, { useEffect, useState } from 'react'
import classes from './suggestedPlaces.module.css'
import { useSelector } from 'react-redux'
import  img from '../../assets/img9.jpg'
import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const SuggestedPlaces = () => {

  const [estates, setEstates] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchTypeRooms = async() => {
      try {
        const response = await fetch(`http://localhost:5000/room`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json()
        setEstates(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTypeRooms()
  }, [])

  return (
    <section id='suggested' className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Most visited places</h5>
          <h2 className={classes.title}>Favourite destination of our clients</h2>
        </div>
        <div className={classes.places}>
          {estates.map((suggestedPlace) => (
            <Link className={classes.place} key={suggestedPlace._id} to={`/typeDetail/${suggestedPlace._id}`}>
                <div className={classes.imgWrapper}>
                  <img src={img} alt="" />
                </div>
                <div className={classes.titleAndReview}>
                  <span>{suggestedPlace.title}</span> 
                  <span className={classes.review}><AiFillStar className={classes.icon}/> {suggestedPlace.review}</span >
                </div>
                <div className={classes.countryAndPrice}>
                  <span>Country: <span>{suggestedPlace.country}</span></span>
                  <span className={classes.price}>{suggestedPlace.price} $/per person</span>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SuggestedPlaces