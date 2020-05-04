import React from 'react';
import classes from './SideDrawer.module.scss';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Logo from 'components/Logo/Logo';
import NavigationItems from '../NavigationBar/NavigationItems/NavigationItems';

const sideDrawer = (props) => {
  let sideDrawerClasses = props.open 
    ? [classes.SideDrawer, classes.Open] 
    : [classes.SideDrawer, classes.Close];
  
  return (
    <React.Fragment>
      <Backdrop show={props.open} onclick={props.handleSideDrawerClose}/>
      <div 
        className={sideDrawerClasses.join(' ')}
        onClick={props.handleSideDrawerClose}
      >
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer;
