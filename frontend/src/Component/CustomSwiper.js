// PROGRAM – Program to render page content
// PROGRAMMER: So, Chi Fung
// CALLING SEQUENCE: return the JSX element, then call useffect. 
// VERSION 1: written 4-2-2020
// REVISION 1.1: written 4-5-2020
// PURPOSE: render page content
// DATA STRUCTURES: Json Data Type storing course details
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  SwiperElement: {
    // minHeight: 'calc(100vh - 172px)'
    height: '100%'
  },
  swiperContainerDefine: {
    // minHeight: 'calc(100vh - 172px)',
    // maxHeight:'calc(100vh - 172px)',
    height: '105px !important',
    maxHeight: '105px !important'
  },
  img: {
    // 
    maxHeight: 'calc(100vh - 230px)',
    margin: '-50px',
    // height:'auto',
    // maxWidth:'100%'
  },
  imgcontainer: {
    maxWidth: '1200px',
    maxHeight: 'calc(100vh - 170px)',
    minHeight: 'calc(100vh - 170px)',

  },
  titleContainer:{
    // paddingTop: '450px'
    margin: "auto"
  },

  title: {
    color: 'grey', 
    marginBottom: theme.spacing(2)
  },
  
}));

const CustomSwiper = () => {
  const classes = useStyles();

  const params = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,

    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

 

  }

  return (
    // This is the Swiper for the Welcome Page
    <Swiper  {...params}>
      <div className={classes.titleContainer}>
        <Typography variant="h3" gutterBottom>CUHK Live Classroom</Typography>
        <Typography variant="h4" className={classes.title}>Filled with Features you could ever dream of. But not anymore.</Typography>
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Production Level Welcome Page</Typography>
        <img className={classes.img} src='https://i.imgur.com/qZ9W8ct.png'></img><br />
      </div>

      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Regression Analysis on Relation Between Quiz Score, Attendance Rate, and Course Rating Score</Typography>
        <img className={classes.img} src='https://i.imgur.com/bPpxiLd.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Integrated Attendance System and Recording Checking, with Dynamic Grpahs </Typography>
        <img className={classes.img} src='https://i.imgur.com/JilcflE.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Integrated Quiz System with Score Analysis </Typography>
        <img className={classes.img} src='https://i.imgur.com/s9wZXuW.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Integrated Forum System with Push Notification for Question asking </Typography>

        <img className={classes.img} src='https://i.imgur.com/L35NW6G.png'></img><br />
      </div>

      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>All updates captured at first glance.  </Typography>
        <img className={classes.img} src='https://i.imgur.com/Cqrwe35.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Course Materials, Deadlines, Updates and Ratings, All in One Page </Typography>
        <img className={classes.img} src='https://i.imgur.com/wBVjhX2.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title}>Wanna sit in a Course, and receive all the Course Materials? Not a problem anymore.</Typography>
        <img className={classes.img} src='https://i.imgur.com/KAHeJMG.png'></img><br />
      </div>
      <div className={classes.imgcontainer}>
        <Typography variant="h6" className={classes.title} gutterBottom>Responsive Web Design, Support All Users</Typography>
        <img className={classes.img} src='https://i.imgur.com/rvsoaAU.png'></img><br />
      </div>

    </Swiper>

  )

};

export default CustomSwiper;