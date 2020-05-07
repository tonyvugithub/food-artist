import React, { useEffect, useState } from "react";
import axios from 'API/axios-recipes';
import Recipes from "components/Recipes/Recipes";
import Spinner from "components/UI/Spinner/Spinner";

import classes from "./Samples.module.scss";

const Samples = () => {

  const [randomRecipes, setRandomRecipes] = useState([])
  //Get random recipes after the samples component mounted
  useEffect(()=>{
    axios
    .get(`/random?number=10&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
    .then((res) =>
      res.data.recipes.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        src: recipe.image,
        summary: recipe.summary,
      }))
    )
    .then((recipes) => {
      setRandomRecipes(recipes);
    })
    .catch((err) => console.log(err));
  },[]);
  

  const samples = randomRecipes ? <Recipes recipes={randomRecipes}/> : <Spinner/> ;
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