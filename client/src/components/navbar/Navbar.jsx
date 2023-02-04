import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './navbar.module.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }


  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
        <div className={classes.wrapper}>
          <div className={classes.left}>
            <Link to='/'>
              <h2 className={classes.title}>NicccccoDev</h2>
            </Link>
          </div>
          <div className={classes.center}>
            <ul className={classes.list}>
              <li className={classes.listItem}><a href="#">Home</a></li>
              <li className={classes.listItem}><a href="#about">About</a></li>
              <li className={classes.listItem}><a href="#services">Services</a></li>
              <li className={classes.listItem}><a href="#suggested">Suggested</a></li>
            </ul>
          </div>
          <div className={classes.right}>
            <Link className={classes.login} to='/login'>Login</Link>
            <Link className={classes.signup} to='/signup'>Sign up</Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar