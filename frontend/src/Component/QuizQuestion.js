
import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        width: '80%',

    },
    quizqContainer: {
        margin: '25px auto'
    },
    chartPaper: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%'
    },
    textCenter: {
        margin: '0 auto'
    }
}));
let QuizQuestion = (props) => {
    const classes = useStyles();

    return (
        <Grid container  >
            <Grid item xs={12}>
                {props.question && props.question.map((item, index) => {
                    return (
                        <Paper className={` ${classes.paper} ${classes.chartPaper}`}>

                            <Grid container className={classes.quizqContainer}>

                                <Typography className={classes.textCenter} variant="h5" component="h5">Question {index + 1}</Typography>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">{item.Question}</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1">
                                        <FormControlLabel value={item.A} control={<Radio disabled />} name='A' label={item.A} />
                                        <FormControlLabel value={item.B} control={<Radio disabled />} name='B' label={item.B} />
                                        <FormControlLabel value={item.C} control={<Radio disabled />} name='C' label={item.C} />
                                        <FormControlLabel value={item.D} control={<Radio disabled />} name='D' label={item.D} />
                                    </RadioGroup>
                                </FormControl>

                                <Typography className={classes.textCenter} variant="h6" component="h6">Your Answer: {props.userscore[index]}</Typography>
                                <Typography className={classes.textCenter} variant="h6" component="h6">Correct Answer: {props.ans[index]}</Typography>
                            </Grid>
                        </Paper>

                    )
                })}
            </Grid>
        </Grid>
    )
}
export default QuizQuestion