import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { Link } from "react-router-dom";
import axios from "axios"
import RegressionAnalysis from "./RegressionAnalysis"
import { UserCourseList } from "../test"
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import QuizHistory from "./QuizHistory"
import AttendanceChart from "../Component/AttendanceChart"
import { UserType } from "../test"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        // margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },

    paperContent: {
        textAlign: 'left',
        justify: 'justified',
        margin: '0 auto'
    },
    mainGrid: {
        marginTop: theme.spacing(3),

    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        color: '#B9B9B9',
        paddingTop: '15px',
        paddingBottom: '15px'
    },

    media: {
        height: 140,
    },

    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        '&:hover': {
            boxShadow: " 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
        },
    },

    Button: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
    },
    app: {
        display: 'flex',
    },
    course: {
        flexGrow: 1
    },
    profUpdate: {
        flexGrow: 1
    }
}));

// This is the homepage for user that have log into their accounts
export default function Home(props) {
    const [itemNumber, setItemNubmer] = React.useState(1);

    const classes = useStyles();
    const [Course, setCourse] = useState()
    const { courselist, courselistDispatch } = useContext(UserCourseList);
    const [openQuiz, setOpenQuiz] = useState(false)
    let [notice, setNotice] = useState(null)
    const { userType } = useContext(UserType)

    const [users, setValues] = useState({
        firstname: '',
        lastname: '',
        major: '',
        minor: '',
        intro: '',
        username: '',
        pic: '',
        email: ''
    });
    useEffect(() => {
        axios.get(`/api/user/info`, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setValues({
                    // ...users,
                    ...response.docs
                });
                console.log(response)
            }
            else {
                console.log(response.error)
            }
        })
    }, [])

    useEffect(() => {
        axios.get(`/api/user/getNotification`, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                let tmp = []
                response.docs.sitNotice.map(item => {
                    tmp.push(item)
                })
                if (userType === 'student') {
                    response.docs.courseNotice.map(item => {
                        tmp.push(item)
                    })
                }

                response.docs.forumNotice.map(item => {
                    tmp.push(item)
                })
                tmp.sort(function (a, b) {
                    if (a.date > b.date) //sort  descending
                        return -1
                    else
                        return 1
                })
                setNotice(tmp)
            }
            else {
                setNotice(response.error)
            }
        })
    }, [userType])
    let renderCourseCard = () => {
        return courselist.map((item, index) => {
            return (
                <React.Fragment key={item.code}>
                    <Grid container >

                        {/* <Grid item xs={1} ></Grid> */}
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <Link className="link" to={`/home/${item.code}`}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.code} {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.department}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                        {/* <Grid item md={1} xs={1} ></Grid> */}
                    </Grid>

                </React.Fragment>
            )
        })
    }
    let renderUpdates = () => {
        if (Array.isArray(notice) && notice.length > 0) {
            return notice.map((item, index) => {
                if (index < itemNumber * 5)
                    return (
                        <React.Fragment key={item._id}>
                            <ListItem>
                                <ListItemText
                                    primary={"type: " + item.type}
                                    secondaryTypographyProps={{ component: 'div' }}
                                    secondary={
                                        <React.Fragment>
                                            <p>Date: {item.date.slice(0, 10)}</p>
                                            <p>Type: {item.type}</p>
                                            <p>Message: {item.message}</p>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider className={classes.divider} />
                        </React.Fragment>
                    )
            })
        }
    }
    let renderLoginedHome = () => (
        // <React.Fragment>
        //     <CssBaseline />
        <div className={classes.root}>

            <Grid container >
                <Grid item xs={12} >
                    <Typography variant="h4" className={classes.title}>
                        Hello, {users.username}. Welcome to Your Dashboard!
                    </Typography>
                </Grid>
                <Grid item xs={12} >

                    <Grid container >
                        <Grid item xs={12} md={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper} elevation={3}>
                                        <Typography variant="h4" className={classes.title}>
                                            My Courses</Typography>
                                        {/* {renderCourseCard()} */}
                                        <Grid container>

                                            {courselist && courselist.map((item, index) => {
                                                return (
                                                    <Grid md={6} xs={12}>
                                                        <Link className="link" to={`/home/${item.code}`}>
                                                            <Button style={{ marginBottom: '15px' }} variant="contained" color="default" onClick={() => setOpenQuiz(!openQuiz)} >{item.name} {item.code}</Button>
                                                        </Link>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>

                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper} elevation={3}>
                                        <Typography variant="h4" className={classes.title}>
                                            Notifications</Typography>
                                        {renderUpdates()}
                                        {notice && notice.length < itemNumber * 5 ?
                                            <div>
                                                <Typography variant="body1" >-------No More Updates-------</Typography>
                                                <Divider className={classes.divider} />
                                            </div>
                                            : <Button variant="contained" color="primary" onClick={() => setItemNubmer(itemNumber + 1)}>Read More</Button>
                                        }


                                    </Paper>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            
                            <Paper className={classes.paper}>
                                <Typography variant="h4" className={classes.title}>
                                    My Attendance Rate (in %)
                                </Typography>
                                <Grid container spacing={2} alignItems="center">
                                    {courselist && courselist.map(i => {
                                        return <Grid item xs={12} md={6} lg={4}> <AttendanceChart course={i.code} /></Grid>
                                    })}
                                </Grid>
                            </Paper>
                            <div id='regression'>
                                <RegressionAnalysis {...props} minheight='0' width='100%' />
                            </div>
                            <div id="quizhistory">
                                <QuizHistory  {...props} minheight='0' width='100%' />
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        // </React.Fragment>
    )
    return (
        <React.Fragment>
            {courselist.length > 0 ? Array.isArray(courselist) ? renderLoginedHome() : <div>no course yet!</div> : <div>loading...</div>}
        </React.Fragment>
    )
}
