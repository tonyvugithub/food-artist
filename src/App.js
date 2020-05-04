import React, { Suspense, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Layout from "./containers/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";

import {validateExistingToken} from 'store/slides/auth/authSlide';
import classes from "./App.module.scss";

const Profile = React.lazy(() => {
  return import("./containers/Profile/Profile");
});

const Search = React.lazy(() => {
  return import("./containers/Search/Search");
});

const Login = React.lazy(() => {
  return import("components/Authenticate/Login/Login");
});

const Register = React.lazy(() => {
  return import("components/Authenticate/Register/Register");
});

const Logout = React.lazy(() => {
  return import("components/Authenticate/LogOut/LogOut");
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(validateExistingToken());
  },[dispatch])

  const routes = (
    <Switch>
      <Route path="/search" render={(props)=><Search {...props}/>}/>
      <Route path="/register" render={(props)=><Register {...props}/>}/>
      <Route path="/login" render={(props)=><Login {...props}/>}/> />
      <Route path="/logout" render={(props)=><Logout {...props}/>}/> />
      <Route path="/profile" render={(props)=><Profile {...props}/>}/> />
      <Route path="/" exact component={HomePage} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className={classes.App}>
      <Layout><Suspense fallback={<p>Loading...</p>}>{routes}</Suspense></Layout>
    </div>
  );
};

export default withRouter(App);
