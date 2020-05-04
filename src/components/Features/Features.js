import React from "react";
import Feature from "./Feature/Feature";
import classes from "./Features.module.scss";

const featureList = [
  {
    id: 1,
    content: "Search and save over 360,000+ recipes",
  },
  {
    id: 2,
    content: "Add your own recipes",
  },
  {
    id: 3,
    content: "Add personal note",
  },
  {
    id: 4,
    content: "Create a shopping list from the recipes",
  },
];

const features = () => (
  <div className={classes.Container}>
    <div className={classes.Join}>
      <h2>Become a member and start organize your recipes</h2>
      <a href='/register'>Join For Free</a>
    </div>
    <div className={classes.OpeningText}>
      <h2>We offer the features you deserve</h2>
      <p>Get started to receive the following features free of charge. We offer all of our features with the hope that you would enjoy it and spread the words</p>
    </div>
    <div className={classes.Features}>
      {featureList.map((feature) => (
        <Feature key={feature.id} content={feature.content} />
      ))}
    </div>
  </div>
);

export default features;
