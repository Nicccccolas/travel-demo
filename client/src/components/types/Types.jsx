import React, { useEffect, useState } from 'react'
import classes from './types.module.css'
import { Link } from 'react-router-dom'
import img1 from '../../assets/img7.jpg'
import { useSelector } from 'react-redux'

const Types = () => {
  const [types, setTypes] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room/find/types`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const types = await res.json()
        setTypes(types)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchTypes()
  }, [])


  return (
    <section id='services' className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5 className={classes.subtitle}>Residing place</h5>
          <h2 className={classes.title}>What type of place you what</h2>
        </div>
        <div className={classes.types}>
          {Object.entries(types).map(([key, value]) => (
            <Link to={`/types/${key}`} key={key + value} className={classes.type}>
              <div className={classes.imgWrapper}>
                <img src={img1} alt="" />
              </div>
              <span>{key} {value}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Types