// PROGRAM – Program to render page content
// PROGRAMMER: So, Chi Fung
// CALLING SEQUENCE: return the JSX element, then call useffect. 
// VERSION 1: written 4-2-2020
// REVISION 1.1: written 4-5-2020
// PURPOSE: render page content
// DATA STRUCTURES: Json Data Type storing course details
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import CustomSwiper from "../Component/CustomSwiper"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  rightToolBar: {
    marginLeft: 'auto',
    marginRight: -12,
    color: 'white !important'
  },

  conetent: {
    marginTop: '64px'
  },

  mainIntroText: {
    fontSize: 22,
  },

  welcomePhoto: {
    width: "100%"
  },

  text: {
    fontSize: 20,
  },

  title: {
    fontSize: 24,
  },

  inGridText: {
    margin: "auto"
  },
  root: {
    minHeight: 'calc(100vh - 92px)',
    // maxHeight:'calc(100vh - 92px)',
  },
  paper:{
    width: '70%',
    margin: '50px auto'
  },
  paperContentWrapper:{
    padding: '55px',
    textAlign: 'left'
  },

  divider: {
    marginBottom: 10,
    marginTop: 8,
  },

}));

const Welcome = () => {
  const classes = useStyles();
  // Welcome Page
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>CUHK Live Classroom</Typography>
            <Button color="primary" className={classes.rightToolBar} size="large" component={Link} to="/login">Login/My Page</Button>
          </Toolbar>
        </AppBar>
        <div className={classes.conetent}>
        <Typography variant="h4" style={{marginTop: '100px'}} gutterBottom></Typography>
          <CustomSwiper />
          <Paper elevation={3} className={classes.paper} >
            <div className={classes.paperContentWrapper}>
            <Typography variant="h4">Tech Features</Typography>
            <Divider className={classes.divider} />
            <Typography variant="body1">1. Progressive Web App: Can be installed on mobile phone without submitting to digital distribution service platform (Google Play, App Store).</Typography>
            <img src='https://i.imgur.com/AUpDVIE.jpg'></img>
            <Divider className={classes.divider} />

            <Typography variant="body1">2. Single Page Application: No extra queries to the server to download pages.</Typography>
            <Divider className={classes.divider} />

            <Typography variant="body1">3. Responsive Web Design: Suitable for both mobile and desktop users.</Typography>
            <Divider className={classes.divider} />

            <Typography variant="body1">4. Data Visualization</Typography>
            <Divider className={classes.divider} />

            <Typography variant="body1">5. Framework used: React.Js, ExpressJs, MongoDB</Typography>
            <Divider className={classes.divider} />

            <Typography variant="body1">6. Archieved ALL optional features stated in CSCI3100 Project Requirement Specification</Typography>
            <Typography variant="body1">(Regression Analysis, Visualization, Access control mechanism, managing user, mobile support)</Typography>
            <Divider className={classes.divider} />

            <Typography variant="body1">7. Secure Cookies Login Authentication</Typography>
            

            <Divider className={classes.divider} />

            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>

  );
}

export default Welcome;