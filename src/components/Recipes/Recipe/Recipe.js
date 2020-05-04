import React from "react";
import classes from "./Recipe.module.scss";

const recipe = (props) => {
  const recipeClass = props.searchClass ? [classes.Recipe, classes.SearchModule] : [classes.Recipe];
  return (
    <div className={recipeClass.join(' ')}>
      <div>
        <img src={props.src} alt={props.title} />
      </div>
      <div className={classes.Content}>
        <p className={classes.Title}>{props.title}</p>
        <p className={classes.Summary}>{props.summary}</p>
      </div>
    </div>
  );
};
export default recipe;
