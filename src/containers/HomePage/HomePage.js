import React from "react";
import classes from "./HomePage.module.scss";
import Banner from "components/Banner/Banner";
import Samples from "components/Samples/Samples";
import Steps from "components/Steps/Steps";
import Features from "components/Features/Features";

const homePage = () => {
  return (
    <div className={classes.HomePage}>
      <Banner />
      <Samples />
      <Steps />
      <Features />
    </div>
  );
};

export default homePage;
