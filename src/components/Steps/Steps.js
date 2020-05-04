import React from "react";
import Step from "./Step/Step";
import classes from "./Steps.module.scss";

const stepsConfig = [
  {
    number: 1,
    action: "Search",
    description: "Thinking of what to cook for the day? Think no more as you can have all the recipe information at your fingertips. Just one click and you have access to 360,000+ recipes. Daily meals do not have to be boring anymore...",
  },
  {
    number: 2,
    action: "Create",
    description: "Your grandma passed you a family recipe that need to be retained for next generations? No worry at all, you can create your own recipe and keep it safe in your Food Artist account",
  },
  {
    number: 3,
    action: "Organize",
    description: "Saw a recipe you really like? Simply pull it into your own account for future cooking. Organize your recipes anyway you want with your own tags",
  },
  {
    number: 4,
    action: "Showcase",
    description: 'Feel proud of your latest recipe and want to tell the world "I am a food artist!"? You can share your masterpiece recipes to facebook and instagram directly from your Food Artist account',
  },
];

const steps = () => (
  <div className={classes.Steps}>
    <h2 className={classes.Heading}>How you use our app?</h2>
    <div className={classes.Content}>
      {stepsConfig.map((step) => (
        <Step
          key={step.number}
          number={step.number}
          action={step.action}
          description={step.description}
        />
      ))}
    </div>
  </div>
);

export default steps;
