import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classes from './navbar.module.css'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
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
          {!user ?
            <>
              <Link className={classes.login} to='/login'>Login</Link>
              <Link className={classes.signup} to='/signup'>Sign up</Link>
            </>
            :
            <>
            <Link to='/create'>Create</Link>
            <p className={classes.username}>{user.username}</p>
            <span onClick={handleLogout} className={classes.logout}>Logout</span>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar