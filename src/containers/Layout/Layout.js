import React, { useState } from "react";
import {useSelector} from 'react-redux';
import {selectAuthState} from 'store/slides/auth/authSlide';

import NavigationBar from "components/Navigation/NavigationBar/NavigationBar";
import SideDrawer from "components/Navigation/SideDrawer/SideDrawer";
import Footer from "components/Footer/Footer";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const { token } = useSelector(selectAuthState);
  const isAuthenticated = token !== null;

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const hamburgerClickHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <NavigationBar
        isAuthenticated={isAuthenticated}
        onHamburgerClick={hamburgerClickHandler}
      />
      <SideDrawer
        isAuthenticated={isAuthenticated}
        open={showSideDrawer}
        handleSideDrawerClose={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
