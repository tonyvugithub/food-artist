import React from "react";
import NavigationItem from "components/Navigation/NavigationBar/NavigationItems/NavigationItem/NavigationItem";
import classes from "./ControlPanel.module.scss";

const navItems = [
  {
    name: "My Info",
    link: "/profile/info",
  },
  {
    name: "Collections",
    link: "/profile/collection",
  },
  {
    name: "Create Recipe",
    link: "/profile/create-recipe",
  },
];
const ControlPanel = () => {
  return (
    <div className={classes.ControlPanel}>
      {navItems.map((item) => {
        return (
          <NavigationItem key={item.name} link={item.link}>
            {item.name}
          </NavigationItem>
        );
      })}
    </div>
  );
};

export default ControlPanel;
