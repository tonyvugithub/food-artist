import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "store/slides/auth/authSlide";
import classes from "./RecipePage.module.scss";
import axios from "axios";

import Button from "components/UI/Button/Button";
import RecipeDetails from "./RecipeDetails/RecipeDetails";
const _ = require("lodash");

const RecipePage = (props) => {
  const { token, userId } = useSelector(selectAuthState);
  const recipeId = props.match.params.id;

  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeSummary, setRecipeSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [recipeImg, setRecipeImg] = useState("");
  const [tag, setTag] = useState("");
  const [showFinalizeButton, setShowFinalizeButton] = useState(false);

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

  const fetchButtonClickHandler = () => {
    //If not signin, you are not allow to add, promt to sign in
    //Choose a tag to organize the recipes
    const recipeInfo = {
      id: recipeId,
      title: recipeTitle,
      summary: recipeSummary,
      steps: recipeSteps.map((step) => _.pick(step, ["number", "step"])),
      src: recipeImg,
      userId: userId,
      tag: tag,
    };
    axios
      .post(
        `https://react-cook-book-b40f3.firebaseio.com/recipes.json?auth=${token}`,
        recipeInfo
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.RecipePage}>
      <RecipeDetails
        recipeTitle={recipeTitle}
        recipeSummary={recipeSummary}
        recipeSteps={recipeSteps}
        recipeImg={recipeImg}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        showSteps={showSteps}
        setShowSteps={setShowSteps}
      />

      <div className={classes.Buttons}>
        {!showFinalizeButton && (
          <Button
            btnType="Continue"
            onclick={() => setShowFinalizeButton(!showFinalizeButton)}
          >
            Fetch this recipe!
          </Button>
        )}
        {showFinalizeButton && (
          <React.Fragment>
            <div className={classes.TagBox}>
              <label for="tag">Please create a tag for this recipe</label>
              <input type="text" name="tag" value={tag} onChange={(event) => {setTag(event.target.value)}}></input>
            </div>
            <Button btnType="Continue" onclick={fetchButtonClickHandler}>
              Continue
            </Button>
          </React.Fragment>
        )}
        <Button btnType="Cancel" onclick={()=>props.history.goBack()}>Search Again</Button>
      </div>
    </div>
  );
};

export default RecipePage;
