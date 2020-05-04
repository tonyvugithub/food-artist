import React from "react";
import { Switch, Route } from "react-router-dom";

import ControlPanel from "./ControlPanel/ControlPanel";
import ContentPanel from "./ContentPanel/ContentPanel";
import CreateRecipe from "./ContentPanel/CreateRecipe/CreateRecipe";
import RecipeCollection from "./ContentPanel/RecipeCollection/RecipeCollection";
import UserInfo from "./ContentPanel/UserInfo/UserInfo";
import classes from "./Profile.module.scss";

const Profile = (props) => {
  const routes = (
    <Switch>
      <Route
        path={props.match.path + "/create-recipe"}
        component={CreateRecipe}
      />
      <Route
        path={props.match.path + "/collection"}
        component={RecipeCollection}
      />
      <Route path={props.match.path + "/info"} component={UserInfo} />
    </Switch>
  );

  return (
    <div className={classes.Profile}>
      <ControlPanel />
      <ContentPanel>{routes}</ContentPanel>
    </div>
  );
};

export default Profile;
