import React from "react";


import Logo from "components/Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import HamburgerMenu from "../SideDrawer/HamburgerMenu/HamburgerMenu";

import classes from "./NavigationBar.module.scss";

const navigationBar = (props) => (
  <header className={classes.NavContainer}>
    <div id='NavBar' className={classes.NavigationBar}>
      <HamburgerMenu onclick={props.onHamburgerClick} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.Desktop}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  </header>
);

export default navigationBar;
