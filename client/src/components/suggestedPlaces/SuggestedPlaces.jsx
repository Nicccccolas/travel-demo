import React, { useEffect, useState } from 'react'
import classes from './suggestedPlaces.module.css'
import { useSelector } from 'react-redux'

const SuggestedPlaces = () => {
const [estates, setEstates] = useState([])
const { token } = useSelector((state) => state.auth)

useEffect(() => {
  const fetchTypeRooms = async() => {
    try {
      const response = await fetch('http://localhost:5000/room', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchTypeRooms()
})

  return (
    <section id='suggested' className={classes.container}>
<div className={classes.Wrapper}>
  <div className={classes.titles}>
    <h5 className={classes.subtitle}>Most visited places</h5>
    <h2 className={classes.title}>Favourite destination of our clients</h2>
  </div>
  <div className={classes.places}>
    {/* {estates.map()} */}
  </div>
</div>
    </section>
  )
}

export default SuggestedPlaces