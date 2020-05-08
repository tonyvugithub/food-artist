import React, { useState } from "react";
import { useSelector } from "react-redux";
import Recipes from "components/Recipes/Recipes";
import Button from 'components/UI/Button/Button';
import classes from "./RecipeCollection.module.scss";
import { selectProfileState } from "store/slides/profile/profileSlide";

const RecipeCollection = (props) => {
  const [tag, setTag] = useState("");
  const [recipesByTag, setRecipesByTag] = useState([]);
  const { recipeCollection, tags } = useSelector(selectProfileState);

  const getRecipeByTag = () => {
    if(tag==="") {
      setRecipesByTag(recipeCollection);
    } else {
      setRecipesByTag(recipeCollection.filter(recipe => recipe.tag === tag));
    }
  }

  return (
    <div className={classes.RecipeCollection}>
      <div className={classes.TagBox}>
        <label htmlFor="tags">Please choose a tag to see recipes</label>
        <input
          type="text"
          name="tags"
          list="tags"
          placeholder="Eg: abc"
          onChange={(event) => setTag(event.target.value)}
        />
        <datalist id="tags">
          {tags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </datalist>
        <Button btnType="Continue" onclick={getRecipeByTag}>Continue</Button>
      </div>
      <div className={classes.Content}>
        <Recipes recipes={recipesByTag} collectionClass={true} />
      </div>
    </div>
  );
};

export default RecipeCollection;
