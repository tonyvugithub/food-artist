import React, {useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import ControlPanel from "./ControlPanel/ControlPanel";
import ContentPanel from "./ContentPanel/ContentPanel";
import classes from "./Profile.module.scss";

import { selectAuthState } from 'store/slides/auth/authSlide';
import { getNameAsync, getCollectionAsync, selectProfileState, getTagsAsync } from 'store/slides/profile/profileSlide';

const Profile = (props) => {
  const { userId, token } = useSelector(selectAuthState);
  const { displayName } = useSelector(selectProfileState);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getNameAsync(token, userId));
    dispatch(getCollectionAsync(token, userId));
    dispatch(getTagsAsync(token,userId));
  },[dispatch,token, userId]);
  
  const UserInfo = React.lazy(()=>{
    return import("./ContentPanel/UserInfo/UserInfo");
  });
  const RecipeCollection = React.lazy(()=>{
    return import("./ContentPanel/RecipeCollection/RecipeCollection");
  });
  const CreateRecipe = React.lazy(()=> {
    return import("./ContentPanel/CreateRecipe/CreateRecipe");
  });

  const routes = (
    <Switch>
      <Route
        path={props.match.path + "/create-recipe"}
        render={()=> <CreateRecipe/>}
      />
      <Route
        path={props.match.path + "/collection"}
        render={()=> <RecipeCollection/>}
      />
      <Route path={props.match.path + "/info"} render={()=><UserInfo displayName={displayName} email/>} />
      <Route path={props.match.path}><p>Welcome <span className={classes.User}>{displayName}</span> to Food Artist, we hope you would enjoy your time on the page. Happy cooking!</p></Route>
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
