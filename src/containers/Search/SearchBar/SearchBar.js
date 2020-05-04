import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";
import Spinner from "components/UI/Spinner/Spinner";

import {
  searchRecipeByNameAsync,
  selectRecipeState,
  resetRecipes,
} from "store/slides/recipe/recipeSlide";

const SearchBar = () => {
  const { register, handleSubmit, errors } = useForm();

  const { nameOfFood, isLoading } = useSelector(selectRecipeState);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (data.foodName !== nameOfFood) {
      dispatch(searchRecipeByNameAsync(data.foodName, 5));
      dispatch(resetRecipes());
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="What's Food?"
          elementConfig={{
            type: "text",
            placeholder: "Eg: burger, pasta, cake, ice-cream...etc",
          }}
          elementType="input"
          register={register({
            required: "Cannot be empty, please type something",
          })}
          name="foodName"
          error={errors.foodName}
          autofocus={true}
        />
        {isLoading ? <Spinner/> : <Button btnType="Continue">Get Recipes</Button>}
      </form>
    </div>
  );
};

export default SearchBar;
