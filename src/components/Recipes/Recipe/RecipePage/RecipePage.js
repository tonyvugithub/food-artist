import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {selectAuthState} from 'store/slides/auth/authSlide';
import classes from "./RecipePage.module.scss";
import axios from "axios";

import Button from "components/UI/Button/Button";
const _ = require('lodash');

const RecipePage = (props) => {
  const {token, userId} = useSelector(selectAuthState);
  const recipeId = props.match.params.id;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [recipeImg, setRecipeImg] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      )
      .then((res) => {
        setRecipeTitle(res.data.title);
        setRecipeSummary(res.data.summary);
        setRecipeImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      )
      .then((res) => {
        setRecipeSteps(res.data[0].steps);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipeId]);

  const fetchButtonClickHandler = (recipeId) => {
    //If not signin, you are not allow to add, promt to sign in
    //Choose a tag to organize the recipes
    const recipeInfo = {
      id: recipeId,
      title: recipeTitle,
      summary: recipeSummary,
      steps: recipeSteps.map(step => _.pick(step, ['number','step'])),
      src: recipeImg,
      userId: userId
    };
    axios.post(`https://react-cook-book-b40f3.firebaseio.com/recipes.json?auth=${token}`,recipeInfo)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.RecipeSummary}>
      <div className={classes.RecipeImg}>
        <img src={recipeImg} alt={recipeTitle} />
      </div>
      <div>
        <h3>Recipe Title:</h3>
        <p>{recipeTitle}</p>
      </div>
      <div className={classes.RecipeSummary}>
        <h3>Recipe Summary:</h3>
        {!showSummary && (
          <span onClick={() => setShowSummary(!showSummary)}>Click to read...</span>
        )}
        {/*dangerouslySetInnerHTML={{ __html: recipeSummary}}  convert the html tag inside the summary text*/}
        {showSummary && <p dangerouslySetInnerHTML={{ __html: recipeSummary }}/>}
        {showSummary && (
          <span onClick={() => setShowSummary(!showSummary)}>...minimize</span>
        )}
      </div>
      <div>
        <h3>Instructions:</h3>
        {!showSteps && (
          <span onClick={() => setShowSteps(!showSteps)}>Click to read...</span>
        )}
        {showSteps && (
          <div>
            {recipeSteps.map((step) => (
              <p key={step.number}>
                Step {step.number}: {step.step}
              </p>
            ))}
          </div>
        )}
        {showSteps && (
          <span onClick={() => setShowSteps(!showSteps)}>...minimize</span>
        )}
      </div>
      <div className={classes.FetchButton}>
        <Button btnType="Continue" onclick={()=>fetchButtonClickHandler(recipeId)}>Fetch this recipe!</Button>
      </div>
    </div>
  );
};

export default RecipePage;
