import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.scss";
import { withRouter } from "react-router-dom";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    {props.location.pathname !== "/" && (
      <NavigationItem link="/" exact>
        Home
      </NavigationItem>
    )}
    <NavigationItem link="/search">Search</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/login">Login</NavigationItem>
    ) : (
      <React.Fragment>
        <NavigationItem link="/profile">My Book</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </React.Fragment>
    )}
  </ul>
);

export default withRouter(navigationItems);
