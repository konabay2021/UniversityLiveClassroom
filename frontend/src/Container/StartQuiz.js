import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    app: {

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    paper: {
        width: '100%',
        height: '100%',
        padding: theme.spacing(2),
    },
    main: {
        flex: 1,
    },

}));

let StartQuiz = (props) => {
    const classes = useStyles();

    let renderQuiz = () => {
        return (
            <React.Fragment>
                <div className={classes.app}>
                    <div className={classes.main}>
                        <Typography variant="h4" align="left" noWrap>
                            <Grid item xs={12}>Select Course</Grid>
                        </Typography>
                        <Grid container>
                            <Grid item xs={2}>
                                <Grid container>
                                    <List>
                                        <ListItem button component={Link} to="/Quiz">
                                            <ListItemText primary="CSCI3100" />
                                        </ListItem>
                                        <ListItem button button component={Link} to="/Quiz">
                                            <ListItemText primary="CSCI4430" />
                                        </ListItem >
                                        <ListItem button button component={Link} to="/Quiz">
                                            <ListItemText primary="ENGG1120" />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h4" align="center" noWrap>Quiz <br /></Typography>
                                <Paper>
                                    <Typography align="left">Question 1:</Typography>

                                    <FormControl margin="normal" component="fieldset">
                                        <FormLabel component="legend">Who is CSCI3100 Professor?</FormLabel>
                                        <RadioGroup aria-label="Q1answer" name="Q1answer" >
                                            <FormControlLabel value="zili" control={<Radio />} label="Zili" />
                                            <FormControlLabel value="paktric" control={<Radio />} label="Paktric" />
                                            <FormControlLabel value="liu" control={<Radio />} label="Liu" />
                                        </RadioGroup>
                                    </FormControl>
                                </Paper>
                                <br />
                                <Paper>
                                    <Typography align="left">Question 2:</Typography>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Extract Question From Database</FormLabel>
                                        <RadioGroup aria-label="Q1answer" name="Q1answer" >
                                            <FormControlLabel value="a" control={<Radio />} label="A" />
                                            <FormControlLabel value="b" control={<Radio />} label="B" />
                                            <FormControlLabel value="c" control={<Radio />} label="C" />
                                        </RadioGroup>
                                    </FormControl>

                                </Paper>
                                <br />
                                <Paper>
                                    <Typography align="left">Question 3:</Typography>

                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Any Stupid Question?</FormLabel>
                                        <RadioGroup aria-label="Q1answer" name="Q1answer" >
                                            <FormControlLabel value="stop" control={<Radio />} label="Stop" />
                                            <FormControlLabel value="bothering" control={<Radio />} label="Bothering" />
                                            <FormControlLabel value="me" control={<Radio />} label="Me" />
                                        </RadioGroup>
                                    </FormControl>
                                </Paper>
                                <br />
                                <Button variant="outlined" size="large" type='submit' onClick={() => { window.location.href = "/Attendance" }}>Summit</Button>
                                <Button variant="outlined" size="large"  >Reset</Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    let RedirectToLogin = () => {
        alert("You have not yet login!");
        const { history } = props;
        history.push('/login');
    }
    return (
        <React.Fragment>
            {localStorage.getItem('token') ? renderQuiz() : RedirectToLogin()}
        </React.Fragment>
    )
}

export default StartQuiz
