import React from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import Input from "components/UI/Input/Input";
import Button from "components/UI/Button/Button";
//import Spinner from "../../components/UI/Spinner/Spinner"; */
import classes from "./Register.module.scss";
import ErrorMessage from "components/UI/ErrorMessage/ErrorMessage";
import { authenticate, selectAuthState } from "store/slides/auth/authSlide";

const Register = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const {token, authRedirectPath, error} = useSelector(selectAuthState);
  
  const dispatch = useDispatch();

  const signupForm = {
    firstname: {
      elementType: "input",
      elementLabel: "First Name",
      elementName: "firstname",
      elementConfig: {
        type: "text",
        placeholder: "Eg: John",
      },
      validation: {
        required: "First name is required",
        maxLength: 255
      },
      error: errors.firstname,
    },
    lastname: {
      elementType: "input",
      elementLabel: "Last Name",
      elementName: "lastname",
      elementConfig: {
        type: "text",
        placeholder: "Eg: Smith",
      },
      validation: {
        required: "Last name is required",
        maxLength: 255
      },
      error: errors.lastname,
    },
    email: {
      elementType: "input",
      elementLabel: "Email",
      elementName: "email",
      elementConfig: {
        type: "email",
        placeholder: "email@sample.com",
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
        minLength: {
          value: 8,
          message: "Password is too short, at least 8 characters",
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          message:
            "Password needs to have at least 1 uppercase letter, 1 lower case, 1 number and 1 special character",
        },
      },
      error: errors.password,
    },
  };

  const onSubmit = (data) => {
    const isInRegisterMode = true;
    dispatch(authenticate(data, isInRegisterMode));
  };

  const formElementArray = [];
  for (let key in signupForm) {
    formElementArray.push({
      id: key,
      config: signupForm[key],
    });
  }


  const form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      name={formElement.id}
      label={formElement.config.elementLabel}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      register={register(formElement.config.validation)}
      error={formElement.config.error}
    />
  ));

  const authRedirect = token ? <Redirect to={authRedirectPath}/> : null;

  return (
    <div className={classes.Register}>
      {authRedirect}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {form}
        <Button btnType="Continue">Continue</Button>
        <Button btnType="Cancel" type="reset">
          Reset
        </Button>
      </form>
      
    </div>
  );
};

export default Register;
