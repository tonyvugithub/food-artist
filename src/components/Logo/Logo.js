import React from 'react'
import logoPhoto from 'assets/images/logo.png';
import classes from './Logo.module.scss';

const logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={logoPhoto} alt='Food Artist logo'/>
    </div>
  )
}

export default logo;
