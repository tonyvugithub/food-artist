import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slides/recipe/recipeSlide';
import authReducer from './slides/auth/authSlide';

export default configureStore({
  reducer: {
    //Name of the state is here
    recipe: recipeReducer,
    auth: authReducer
  },
});
