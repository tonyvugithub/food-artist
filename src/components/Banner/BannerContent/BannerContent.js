import React from 'react'
import classes from './BannerContent.module.scss';


const bannerContent = () => (
    <div className={classes.BannerContent}>
      <div className={classes.TopLine}>Explore your</div>
      <div className={classes.Title}>Food Artist</div>
      <p className={classes.Paragraph}>You are the artist of your food! Explore your potential by joining Food Artist community</p>
      <div className={classes.GetStartedBtn}><a href='/register'>Get started</a></div>
    </div>
  )

export default bannerContent;
