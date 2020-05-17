import React from 'react';
import classes from './Recipe.module.scss';
import { withRouter } from 'react-router-dom';

const recipe = (props) => {
  const recipeClickHandler = (recipeId) => {
    //alert(`Recipe ${recipeId} Clicked!`);
    props.history.push(`/recipe/${recipeId}`);
  };

  let recipeClass = props.searchClass
    ? [classes.Recipe, classes.SearchModule]
    : props.collectionClass
    ? [classes.Recipe, classes.ProfileCollection]
    : [classes.Recipe];

  return (
    <div
      className={recipeClass.join(' ')}
      onClick={() => recipeClickHandler(props.recipeId)}
    >
      <div>
        <img src={props.src} alt={props.title} />
      </div>
      <div className={classes.Content}>
        <p className={classes.Title}>{props.title}</p>
        <p
          className={classes.Summary}
          dangerouslySetInnerHTML={{ __html: props.summary }}
        ></p>
      </div>
    </div>
  );
};
export default withRouter(recipe);
