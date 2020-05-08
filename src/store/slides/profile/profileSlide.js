import { createSlice } from "@reduxjs/toolkit";
import axios from "API/axios-recipes";

export const profileSlide = createSlice({
  name: "profile",
  initialState: {
    displayName: "",
    recipeCollection: [],
    isLoading: false,
    error: ""
  },
  reducers: {
    getNameStart: (state) =>{
      state.isLoading = true;
    },
    getNameSuccess: (state, action) => {
      state.displayName = action.payload;
      state.isLoading = false;
    },
    getNameFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCollectionStart: (state) => {
      state.isLoading = true;
    },
    getCollectionSuccess: (state,action) => {
      state.recipeCollection = action.payload;
      state.isLoading = false;
    },
    getCollectionFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { getNameStart, getNameSuccess, getNameFail, getCollectionStart, getCollectionSuccess, getCollectionFail} = profileSlide.actions;

export const selectProfileState = state => state.profile;

export const getNameAsync = (token,userId) => dispatch => {
  dispatch(getNameStart());
  axios.get(`https://react-cook-book-b40f3.firebaseio.com/users.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => {
        dispatch(getNameSuccess(Object.values(res.data)[0].displayName));
      })
      .catch(err => {
        console.log(err);
        dispatch(getNameFail(err.response.data.error.message));
      });
}

export const getCollectionAsync = (token, userId) => dispatch => {
  dispatch(getCollectionStart());
  axios.get(`https://react-cook-book-b40f3.firebaseio.com/recipes.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
      .then (res => {
        const fetchRecipes = []
        for (let key in res.data){
          fetchRecipes.push(res.data[key]);
        }
        dispatch(getCollectionSuccess(fetchRecipes));
      })
      .catch(err => {
        dispatch(getCollectionFail(err.response.data.error.message));
      });
}

export default profileSlide.reducer;