import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";

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
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
    minHeight: "calc(100vh - 80px)"
  },

  paperContent: {
    textAlign: "left",
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
  }
}));

function valuetext(value) {
  return `${value}Â°C`;
}

export default function Rating() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div className={classes.paperContent}>
            <Typography id="discrete-slider" gutterBottom>
              CSCI3100
            </Typography>
            <Grid container spacing={4}>
              <Grid item>
                <Typography id="one">0</Typography>
              </Grid>
              <Grid item xs={7}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Grid>
              <Grid item>
                <Typography id="one">10</Typography>
              </Grid>
              <Typography id="next_line" gutterBottom />
            </Grid>

            <Typography id="discrete-slider" gutterBottom>
              CSCI3110
            </Typography>
            <Grid container spacing={4}>
              <Grid item>
                <Typography id="one">0</Typography>
              </Grid>
              <Grid item xs={7}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Grid>
              <Grid item>
                <Typography id="one">10</Typography>
              </Grid>
              <Typography id="next_line" gutterBottom />
            </Grid>

            <Typography id="discrete-slider" gutterBottom>
              CSCI3120
            </Typography>
            <Grid container spacing={4}>
              <Grid item>
                <Typography id="one">0</Typography>
              </Grid>
              <Grid item xs={7}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Grid>
              <Grid item>
                <Typography id="one">10</Typography>
              </Grid>
              <Typography id="next_line" gutterBottom />
            </Grid>

            <Typography id="discrete-slider" gutterBottom>
              CSCI3130
            </Typography>
            <Grid container spacing={4}>
              <Grid item>
                <Typography id="one">0</Typography>
              </Grid>
              <Grid item xs={7}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              </Grid>
              <Grid item>
                <Typography id="one">10</Typography>
              </Grid>
              <Typography id="next_line" gutterBottom />
            </Grid>

            <Button
                variant="contained"
                color="primary"
                onClick={() => { window.location.href = "/ratingComplete" }}
                >
              Submit
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}
