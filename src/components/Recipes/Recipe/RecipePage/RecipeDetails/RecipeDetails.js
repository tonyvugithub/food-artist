import React from "react";
import classes from "./RecipeDetails.module.scss";

const RecipeDetails = (props) => {
  return (
    <div className={classes.RecipeDetails}>
      <div className={classes.RecipeImg}>
        <img src={props.recipeImg} alt={props.recipeTitle} />
      </div>
      <div>
        <h3>Recipe Title:</h3>
        <p>{props.recipeTitle}</p>
      </div>
      <div>
        <h3>Recipe Summary:</h3>
        {!props.showSummary && (
          <span onClick={() => props.setShowSummary(!props.showSummary)}>
            Click to read...
          </span>
        )}
        {/*dangerouslySetInnerHTML={{ __html: recipeSummary}}  convert the html tag inside the summary text*/}
        {props.showSummary && (
          <p dangerouslySetInnerHTML={{ __html: props.recipeSummary }} />
        )}
        {props.showSummary && (
          <span onClick={() => props.setShowSummary(!props.showSummary)}>
            ...minimize
          </span>
        )}
      </div>
      <div>
        <h3>Instructions:</h3>
        {!props.showSteps && (
          <span onClick={() => props.setShowSteps(!props.showSteps)}>
            Click to read...
          </span>
        )}
        {props.showSteps && (
          <div>
            {props.recipeSteps.map((step) => (
              <p key={step.number}>
                Step {step.number}: {step.step}
              </p>
            ))}
          </div>
        )}
        {props.showSteps && (
          <span onClick={() => props.setShowSteps(!props.showSteps)}>
            ...minimize
          </span>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
