import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faInfo, faCopyright } from "@fortawesome/free-solid-svg-icons";
import LinkIcon from "components/UI/LinkIcon/LinkIcon";
import classes from "./Footer.module.scss";

const footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.SocialMedia}>
        <LinkIcon
          link="https://github.com/tonyvugithub"
          icon={faGithub}
          className={classes.Github}
          title="Github"
        />
        <LinkIcon
          link="https://linkedin.com/in/tonyknvu"
          icon={faLinkedinIn}
          className={classes.Linkedin}
          title="Linkedin"
        />
        <LinkIcon
          link=""
          icon={faInfo}
          className={classes.Info}
          title="Personal Website"
        />
      </div>
      <div className={classes.Copyright}>
        <FontAwesomeIcon icon={faCopyright} />
        <span> 2020 Tony Khoi-Nguyen Vu</span>
      </div>
      <div className={classes.Credit}>
        <h3>Credits:</h3>
        <p>Recipe API provided by Spoonacular</p>
        <p>Hero photo is fetched from unsplash.com</p>
      </div>
    </div>
  );
};

export default footer;
