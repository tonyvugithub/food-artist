import React from 'react';
import classes from './HamburgerMenu.module.scss';

const hamburgerMenu = (props) => (
    <div onClick={props.onclick} className={classes.HamburgerMenu}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
export default hamburgerMenu;
