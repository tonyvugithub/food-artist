import React from "react";
import classes from "./Step.module.scss";

const step = (props) => (
  <div className={classes.Step}>
    <h3 className={classes.Heading}>
      {props.number}. {props.action}
    </h3>
    <p>{props.description}</p>
  </div>
);

export default step;
