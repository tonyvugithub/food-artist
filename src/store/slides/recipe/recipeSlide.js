import { createSlice } from "@reduxjs/toolkit";
import axios from "API/axios-recipes";

export const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    recipes: null,
    isLoading: false,
    numberOfRecipes: 5,
    nameOfFood: "",
  },
  reducers: {
    recipeStart: (state) => {
      state.isLoading = true;
    },
    initRandomRecipes: (state, action) => {
      state.recipes = action.payload;
      state.isLoading = false;
    },
    resetRecipes: (state, action) => {
      state.recipes = null;
      state.numberOfRecipes = 5;
      state.nameOfFood = "";
    },
    searchRecipeByName: (state, action) => {
      state.recipes = action.payload.recipes;
      state.isLoading = false;
      state.nameOfFood = action.payload.name ? action.payload.name : "";
    },
    increaseRecipeNumber : (state, action) => {
      state.numberOfRecipes += 5; 
    }
  },
});

export const { initRandomRecipes, searchRecipeByName, resetRecipes, increaseRecipeNumber, recipeStart } = recipeSlice.actions;

export const initRandomRecipesAsync = () => (dispatch) => {
  dispatch(recipeStart());
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
      dispatch(initRandomRecipes(recipes));
    })
    .catch((err) => console.log(err));
};

export const searchRecipeByNameAsync = (name, number) => dispatch => {
  dispatch(recipeStart());
  axios
    .get(`https://api.spoonacular.com/recipes/search?query=${name}&number=${number}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`)
    .then((res) =>
      res.data.results.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        src: res.data.baseUri + recipe.image,
      }))
    )
    .then((recipes) => {
      dispatch(searchRecipeByName({recipes : recipes, name: name}));
    })
    .catch((err) => console.log(err));
}
/* export const selectRecipes = state => state.recipe.recipes;
export const selectIsLoading = state => state.recipe.isLoading; */

export const selectRecipeState = state => state.recipe;



export default recipeSlice.reducer;
