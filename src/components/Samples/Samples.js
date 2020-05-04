import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initRandomRecipesAsync,
  selectRecipeState,
} from "store/slides/recipe/recipeSlide";
import Recipes from "components/Recipes/Recipes";
import Spinner from "components/UI/Spinner/Spinner";

import classes from "./Samples.module.scss";

const Samples = () => {

  const {recipes} = useSelector(selectRecipeState);

  const dispatch = useDispatch();

  //Get random recipes after the samples component mounted
  useEffect(()=>{
    dispatch(initRandomRecipesAsync());
  },[dispatch]);
  

  const samples = recipes ? <Recipes recipes={recipes}/> : <Spinner/> ;
  return (
    <div className={classes.Samples}>
      <h2 className={classes.Heading}>
        Check out our delicious recipes today!
      </h2>
      {samples}
    </div>
  );
};

export default Samples;