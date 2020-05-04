import React from "react";
import classes from "./Banner.module.scss";
import HeroImage from "./HeroImage/HeroImage";
import BannerContent from "./BannerContent/BannerContent";

const banner = (props) => {
  return (
    <div id='Banner' className={classes.Banner}>
      <div className={classes.Content}>
        <BannerContent />
      </div>
      <div className={classes.Image}>
        <HeroImage />
      </div>
    </div>
  );
};

export default banner;
