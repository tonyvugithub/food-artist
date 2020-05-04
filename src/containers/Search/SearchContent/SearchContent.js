import React from 'react'
import classes from './SearchContent.module.scss';

const searchContent = (props) => {
  return (
    <div className={classes.SearchContent}>
      {props.children}
    </div>
  )
}

export default searchContent;
