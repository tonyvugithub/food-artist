import React from "react";

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from "./Input.module.scss";

const input = ({elementType, label, elementConfig,value,register,error, autofocus, name}) => {
  let inputElement = null;
  const inputclasses = [classes.InputElement];

  if (error) {
    inputclasses.push(classes.Invalid);
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputclasses.join(" ")}
          name={name}
          {...elementConfig}
          value={value}
          ref={register}
          autoFocus={autofocus || name === 'firstname'}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputclasses.join(" ")}
          name={name}
          {...elementConfig}
          value={value}
          ref={register}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputclasses.join(" ")}
          value={value}
          name={name}
          ref={register}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputclasses.join(" ")}
          name={name}
          {...elementConfig}
          value={value}
          ref={register}
          autoFocus={autofocus || name === 'firstname'}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </div>
  );
};

export default input;
