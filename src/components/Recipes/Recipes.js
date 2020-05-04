import React from "react";
import Recipe from "./Recipe/Recipe";
import classes from "./Recipes.module.scss";

const recipes = (props) => {
  return (
    <div className={classes.Recipes}>
      {props.recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          title={recipe.title}
          summary={recipe.summary}
          src={recipe.src}
          searchClass={props.searchClass}
        />
      ))}
    </div>
  );
};

export default recipes;
