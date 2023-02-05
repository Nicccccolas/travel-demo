import React from 'react'
import classes from './footer.module.css'

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2 className={classes.title}>FAQ</h2>
          <span>Where we are based</span>
          <span>How we operate</span>
          <span>Refund policy</span>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Contacts</h2>
          <span>Linkedin nicopantojadiaz</span>
          <span>Linkedin nicopantojadiaz</span>
          <span>Linkedin nicopantojadiaz</span>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Privacy policy</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ex iure nulla corporis quidem deleniti earum aut laborum voluptatem, quae optio</p>
        </div>
      </div>
    </div>
  )
}

export default Footer