import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { faCreativeCommonsPd } from "@fortawesome/free-brands-svg-icons";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/profile/info",
  },
  //actions + reducers
  reducers: {
    authStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.error = null;
      state.loading = false;
    },
    authFail: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    authLogout: (state) => {
      state.token = null;
      state.userId = null;
    },
    setRedirectPath: (state, action) => {
      state.authRedirectPath = action.payload;
    },
  },
});

//export auth actions
export const {
  authStart,
  authSuccess,
  authFail,
  authLogout,
  setRedirectPath,
} = authSlice.actions;

//Authenticate action (both signup and signin)
export const authenticate = (data, isInRegisterMode) => (dispatch) => {
  const authData = {
    email: data.email,
    password: data.password,
    returnSecureToken: true,
  };
  const requestURL =
    (isInRegisterMode
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=") +
    process.env.REACT_APP_FIREBASE_API_KEY;

  dispatch(authStart());

  axios
    .post(requestURL, authData)
    .then((response) => {
      dispatch(
        authSuccess({
          token: response.data.idToken,
          userId: response.data.localId,
        })
      );
      
      setWithExpiry(
        "authToken",
        { token: response.data.idToken, userId: response.data.localId },
        response.data.expiresIn
      );
      
      axios
        .post(`https://react-cook-book-b40f3.firebaseio.com/users.json?auth=${response.data.idToken}`, {
          userId: response.data.localId,
          displayName: data.firstname + " " + data.lastname,
        })
        .then((res) => {})
        .catch((err) => console.log(err));
    })
    .catch((error) => {
      dispatch(authFail({ error: error.response.data.error.message }));
    });
};

//Log out actions
export const logout = () => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch(authLogout());
};

//Check if there is an existing token stored in local storage.
export const validateExistingToken = () => (dispatch) => {
  const tokenValue = getWithExpiry("authToken");
  if (tokenValue) {
    dispatch(
      authSuccess({ token: tokenValue.token, userId: tokenValue.userId })
    );
  } else {
    dispatch(authLogout());
  }
};

//Export the state of auth reducer
export const selectAuthState = (state) => state.auth;

//Token related functions
//Set the token
const setWithExpiry = (key, item, ttl) => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + ttl * 1000);
  const authInfo = {
    ...item,
    expiry: expirationDate,
  };
  localStorage.setItem(key, JSON.stringify(authInfo));
};

//Retrieve the token
const getWithExpiry = (key) => {
  const tokenStr = localStorage.getItem(key);
  if (!tokenStr) {
    return null;
  }
  const tokenValue = JSON.parse(tokenStr);
  const now = new Date();
  if (now.getTime() > tokenValue.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return tokenValue;
};

export default authSlice.reducer;
