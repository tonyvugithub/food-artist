import React from 'react'
import classes from './ContentPanel.module.scss';

const contentPanel = (props) => {
  return (
    <div className={classes.ContentPanel}>
      {props.children}
    </div>
  )
}
export default contentPanel;