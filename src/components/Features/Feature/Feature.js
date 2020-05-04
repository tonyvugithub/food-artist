import React from "react";
import classes from "./Feature.module.scss";

const feature = (props) => (
  <div className={classes.Feature}>
    <a href='/register'>
      <p>{props.content}</p>
    </a>
  </div>
);

export default feature;
