import React from "react";
import { useSelector, useDispatch } from "react-redux";

import SearchBar from "./SearchBar/SearchBar";
import SearchContent from "./SearchContent/SearchContent";
import Recipes from "components/Recipes/Recipes";
import Button from "components/UI/Button/Button";

import {
  selectRecipeState,
  resetRecipes,
  searchRecipeByNameAsync,
  increaseRecipeNumber,
} from "store/slides/recipe/recipeSlide";
import classes from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();

  const { recipes, numberOfRecipes, nameOfFood } = useSelector(
    selectRecipeState
  );

  const getMoreRecipes = () => {
    dispatch(increaseRecipeNumber());
    dispatch(searchRecipeByNameAsync(nameOfFood, numberOfRecipes + 5));
  };

  const resetSearch = () => {
    dispatch(resetRecipes());
  };

  const result = recipes ? (
    <Recipes recipes={recipes} searchClass={true} />
  ) : null;
  return (
    <div className={classes.Search}>
      <SearchBar />
      <SearchContent>{result}</SearchContent>
      {recipes && (
        <React.Fragment>
          <Button btnType="Continue" onclick={getMoreRecipes}>
            More recipes
          </Button>
          <Button btnType="Cancel" onclick={resetSearch}>
            New Search
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Search;
