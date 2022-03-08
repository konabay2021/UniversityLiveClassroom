import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    "& > *": {
      margin: theme.spacing(0),
      width: "25ch"
    }
  },
  title: {
    color: "#B9B9B9",
    paddingTop: "15px",
    paddingBottom: "15px"
  },
  paper: {
    padding: theme.spacing(8),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    minHeight: "calc(100vh - 80px)"
  },

  paperContent: {
    textAlign: "center",
    justify: "justified",
    width: "60%",
    margin: "0 auto"
  },
  completeBox: {
    padding: "30px 0",
    width: "70%"
  },
  message: {
    paddingBottom: "25px"
  },
}));

export default function Rating(){
    const classes = useStyles();
    return(
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div className={classes.paperContent}>
          <Typography id="Complete" gutterBottom variant="h5">
              Your rating has been uploaded succcessfully !
            </Typography>
            <Button
                variant="contained"
                color="primary"
                >
              Return to main page
            </Button>
          </div>
          </Paper>
          </Grid>
  
    );

}