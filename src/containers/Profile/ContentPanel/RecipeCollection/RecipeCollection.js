import React from 'react';
import Recipes from 'components/Recipes/Recipes';
import classes from './RecipeCollection.module.scss';

const RecipeCollection = (props) => {
  return (
    <div className={classes.RecipeCollection}>
      <Recipes recipes={props.recipes} collectionClass={true}/>
    </div>
  )
}

export default RecipeCollection;