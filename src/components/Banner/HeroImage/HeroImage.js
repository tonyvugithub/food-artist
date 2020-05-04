import React from 'react';
import classes from './HeroImage.module.scss';
import image from 'assets/images/heroImageMedium1.jpg';

const heroImage = () => (
  <div className={classes.HeroImage}>
    <img src={image} alt='credit @ https://unsplash.com/@heftiba'/>
  </div>
)

export default heroImage;
