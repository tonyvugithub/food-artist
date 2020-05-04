import React from 'react'
import classes from './ErrorMessage.module.scss'

const errorMessage = (props) => (
  <div className={classes.ErrorMessage}>
    {props.children}
  </div>
)

export default errorMessage
