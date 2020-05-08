import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";
import Spinner from "components/UI/Spinner/Spinner";
import classes from "./Login.module.scss";
import ErrorMessage from "components/UI/ErrorMessage/ErrorMessage";
import {
  authenticate,
  selectAuthState,
} from "store/slides/auth/authSlide";

const Login = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const { token, loading, authRedirectPath, error } = useSelector(selectAuthState);

  const dispatch = useDispatch();

  const loginForm = {
    email: {
      elementType: "input",
      elementLabel: "Email",
      elementName: "email",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      validation: {
        required: "Email is required",
        pattern: {
          value: /^.+@.+\..{2,4}/,
          message: "Invalid email format",
        },
      },
      error: errors.email,
    },
    password: {
      elementType: "input",
      elementLabel: "Password",
      elementName: "password",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      validation: {
        required: "Password is required",
      },
      error: errors.password,
    },
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(authenticate(data));
  };

  const formElementArray = [];
  for (let key in loginForm) {
    formElementArray.push({
      id: key,
      config: loginForm[key],
    });
  }

  const form = loading ? (
    <Spinner />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formElementArray.map((formElement) => (
        <Input
          key={formElement.id}
          label={formElement.config.elementLabel}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          register={register(formElement.config.validation)}
          error={formElement.config.error}
          name={formElement.config.elementName}
        />
      ))}
      <Button btnType="Continue">Login</Button>
    </form>
  );
  const authRedirect = token ? <Redirect to={authRedirectPath} /> : null;

  return (
    <div className={classes.Login}>
      {authRedirect}
      {(error==="INVALID_PASSWORD" || error === "EMAIL_NOT_FOUND") && <ErrorMessage>Invalid Email or Password</ErrorMessage>}
      {form}
    </div>
  );
};

export default Login;
