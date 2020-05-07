import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import ControlPanel from "./ControlPanel/ControlPanel";
import ContentPanel from "./ContentPanel/ContentPanel";
import CreateRecipe from "./ContentPanel/CreateRecipe/CreateRecipe";
import RecipeCollection from "./ContentPanel/RecipeCollection/RecipeCollection";
import UserInfo from "./ContentPanel/UserInfo/UserInfo";
import classes from "./Profile.module.scss";
import axios from "axios";

import { selectAuthState } from 'store/slides/auth/authSlide';

const Profile = (props) => {
  const { userId, token } = useSelector(selectAuthState);
  const [user, setUser] = useState("");
  const [collection, setCollection] = useState([]);

  useEffect(()=>{
    axios.get(`https://react-cook-book-b40f3.firebaseio.com/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        setUser(Object.values(res.data)[0].displayName);
      })
      .catch(err => {
        console.log(err);
      });
    axios.get(`https://react-cook-book-b40f3.firebaseio.com/recipes.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then (res => {
        const fetchRecipes = []
        for (let key in res.data){
          fetchRecipes.push(res.data[key]);
        }
        setCollection(fetchRecipes);
      })
      .catch(err => {
        console.log(err);
      });
  },[token, userId]);
  
  const routes = (
    <Switch>
      <Route
        path={props.match.path + "/create-recipe"}
        component={CreateRecipe}
      />
      <Route
        path={props.match.path + "/collection"}
        render={()=> <RecipeCollection recipes={collection}/>}
      />
      <Route path={props.match.path + "/info"} render={()=><UserInfo displayName={user} email/>} />
      <Route path={props.match.path}><p>Welcome <span className={classes.User}>{user}</span> to Food Artist, we hope you would enjoy your time on the page. Happy cooking!</p></Route>
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
