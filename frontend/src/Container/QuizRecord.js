import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { AreaChart, Area, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
//sample data
const data = [
    {
        mark: '0-20', percentage: 0.15,
    },
    {
        mark: '20-30', percentage: 2.5,
    },
    {
        mark: '30-40', percentage: 13.5,
    },
    {
        mark: '40-50', percentage: 29,
    },
    {
        mark: '50-60', percentage: 39,
    },
    {
        mark: '60-70', percentage: 13.5,
    },
    {
        mark: '70-80', percentage: 2.5,
    },
    {
        mark: '80-100', percentage: 0.15,
    },
];
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
    button: {
        margin: theme.spacing(1),
    },
}));


let Quiz_Record = (props) => {
    const classes = useStyles();

    let renderQuizRecord = () => {
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
                                    <ResponsiveContainer width="80%" height="80%">
                                        <AreaChart data={data} >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="mark" label={{ value: 'Mark',  position: 'insideBottom' }}/>
                                            <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip />
                                            <ReferenceLine x="60-70" stroke="red" label="You" />
                                            <Area dataKey="percentage" fill="#8884d8" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    <Button className={classes.button} variant="outlined" color="primary" startIcon={<ChevronLeftIcon />} >Previous Quiz</Button>
                                    <Button className={classes.button} variant="outlined" color="primary" startIcon={<HomeIcon />} onClick={() => { window.location.href = "/home" }} >Back to Home page</Button>
                                    <Button className={classes.button} variant="outlined" color="primary" endIcon={<ChevronRightIcon />} >Next Quiz</Button><br />
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
            {localStorage.getItem('token') ? renderQuizRecord() : RedirectToLogin()}
        </React.Fragment>
    )
}

export default Quiz_Record
