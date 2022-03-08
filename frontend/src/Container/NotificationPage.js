import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import CheckIcon from '@material-ui/icons/Check';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import axios from "axios"
import { UserType } from "../test"

const useStyles = makeStyles(theme => ({
    title: {
        color: '#B9B9B9',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    sectitle: {
        color: '#B9B9B9',
        paddingTop: '50px',
        paddingBottom: '15px'
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        minHeight: 'calc(100vh - 172px)'
    },
    deleteContainer: {
        display: 'flex'
    },
    deleteButton: {
        alignSelf: 'center',
        marginLeft: 'auto',
        height: '40px',
        background: 'red',
    },

    paperContent: {
        textAlign: 'left',
        justify: 'justified',
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },

        margin: '0 auto'
    },
    completeBox: {
        padding: '30px 0',
        width: '70%'
    },
    message: {
        paddingBottom: '25px',
    }
}));
let NotificationPage = (props) => {
    const classes = useStyles();
    const { userType } = useContext(UserType)

    let [notice, setNotice] = useState({})
    let [Open, setOpen] = useState('')
    let [AlertMessage, setAlertMessage] = useState()
    const handleClose = () => {
        setOpen(false)
    };
    useEffect(() => {
        axios.get(`/api/user/getNotification`, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                console.log(response)
                response.docs.sitNotice.sort(function (a, b) {
                    if (a.date > b.date) //sort  descending
                        return -1
                    else
                        return 1
                })
                response.docs.forumNotice.sort(function (a, b) {
                    if (a.date > b.date) //sort  descending
                        return -1
                    else
                        return 1
                })
                response.docs.courseNotice.sort(function (a, b) {
                    if (a.date > b.date) //sort  descending
                        return -1
                    else
                        return 1
                })
                setNotice(response.docs)
            }
            else {
                setNotice(response.error)
            }
        })
        // if (JSON.parse(localStorage.getItem('info'))) {
        //     let username = JSON.parse(localStorage.getItem('info')).username
        //     // get notification form server
        //     fetch(`/api/user/getNotification/${username}`, )
        //         .then(response => response.json())
        //         .then(response => {
        //             if (!response.error) {
        //                 console.log(response)
        //                 response.sitNotice.sort(function (a, b) {
        //                     if (a.date > b.date) //sort  descending
        //                         return -1
        //                     else
        //                         return 1
        //                 })
        //                 response.forumNotice.sort(function (a, b) {
        //                     if (a.date > b.date) //sort  descending
        //                         return -1
        //                     else
        //                         return 1
        //                 })
        //                 response.courseNotice.sort(function (a, b) {
        //                     if (a.date > b.date) //sort  descending
        //                         return -1
        //                     else
        //                         return 1
        //                 })
        //                 setNotice(response)

        //             }
        //             else {
        //                 setNotice(response.error)
        //             }


        //         });
        // }
    }, [])

    let handleDeleteNoti = (id, noticeType) => {
        axios.delete(`/api/user/deleteNotification/${id}/${noticeType}`, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setAlertMessage('Deleted!')
                let tmpArray = notice[noticeType].filter(item => {
                    return item._id !== id
                })
                console.log(tmpArray)
                setNotice({ ...notice, [noticeType]: tmpArray })
                setOpen(true)
            }
            else {
                setAlertMessage('Fail to delete')
                setOpen(true)
            }
        })

        // let username = JSON.parse(localStorage.getItem('info')).username
        // fetch(`/api/user/deleteNotification/${username}/${id}/${noticeType}`, { method: 'DELETE'})
        //     .then(response => response.json())
        //     .then(response => {
        //         if (response.docs) {
        //             setAlertMessage('Deleted!')
        //             let tmpArray = notice[noticeType].filter(item=>{
        //                 return item._id !== id
        //             })
        //             console.log(tmpArray)
        //             setNotice({...notice, [noticeType] : tmpArray })
        //             setOpen(true)
        //         } else{
        //             setAlertMessage('Fail to delete')
        //             setOpen(true)
        //           }
        //     })
    }

    let handleSitInApprove = (id, studentUsername, course, type) => {
        axios.post(`/api/user/addEnrolledCourse`,
            {
                'course': course,
                'username': studentUsername,
                'type': type,
                'id': id //noti id
            },
            { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    if (type === 'disallow')
                        setAlertMessage('Successfully Removed!')
                    else
                        setAlertMessage('Successfully Added!')
                    let tmpArray = notice.sitNotice.filter(item => {
                        return item._id !== id
                    })
                    console.log(tmpArray)
                    setNotice({ ...notice, sitNotice: tmpArray })
                    setOpen(true)
                }
                else {
                    setAlertMessage(response.error)
                    setOpen(true)
                }
            })
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         'course': course,
        //         'username': studentUsername,
        //         'profusername': JSON.parse(localStorage.getItem('info')).username,
        //         'type': type,
        //         'id': id //noti id
        //     })
        // };
        // fetch('/api/user/addEnrolledCourse', requestOptions)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             if (type === 'disallow')
        //                 setAlertMessage('Successfully Removed!')
        //             else
        //                 setAlertMessage('Successfully Added!')
        //             let tmpArray = notice.sitNotice.filter(item => {
        //                 return item._id !== id
        //             })
        //             console.log(tmpArray)
        //             setNotice({ ...notice, sitNotice: tmpArray })
        //             setOpen(true)
        //         }
        //         else {
        //             setAlertMessage(response.error)
        //             setOpen(true)
        //         }


        //     });
    }

    let renderNotiMessage = (type) => {
        //sitNotice
        //forumNotice
        //courseNotice
        if (Array.isArray(notice[type])) {
            return notice[type].map(item => {
                return (
                    <React.Fragment key={item._id}>
                        <ListItem>
                            <ListItemText
                                primary={"[" + item.course + "]" + " " + item.type}
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={
                                    <React.Fragment>
                                        <p>Date: {item.date.slice(0, 10)} </p>
                                        {type !== 'courseNotice' && <p>User: {item.studentUsername} </p>}
                                        <p> Message: {item.message}</p>
                                        {userType === 'student'
                                            && type === 'sitNotice'
                                            && <p style={{ color: item.status === 'Success' ? '#84DE02' : '#FFBF00' }}>Status: {item.status} </p>}


                                    </React.Fragment>
                                }
                            />
                            <ListItemSecondaryAction>
                                {type === 'sitNotice'
                                    && userType === 'prof'
                                    && <React.Fragment>
                                        <IconButton edge="end" aria-label="delete"
                                            onClick={() => handleSitInApprove(item._id, item.studentUsername, item.course, 'allow')}
                                        >
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete"
                                            onClick={() => handleSitInApprove(item._id, item.studentUsername, item.course, 'disallow')}

                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }
                                {type === 'forumNotice'
                                    && <React.Fragment>
                                        <IconButton edge="end" aria-label="delete"
                                            onClick={() => handleDeleteNoti(item._id, 'forumNotice')}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }

                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                )
            })
        }
    }

    let renderNoti = () => {
        console.log(notice)
        return (
            <React.Fragment>
                <Grid container>

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={classes.paperContent}>
                                <div className={classes.deleteContainer}>
                                    <Typography variant="h2" noWrap className={classes.title} > Notification</Typography>
                                    {/* <Button className={classes.deleteButton} variant="contained" color="secondary" size="small">Delete All</Button> */}
                                </div>


                                {/* </Grid> */}
                                <Typography variant="body1" gutterBottom>Here are all of your notificaitons: </Typography>

                                <Typography variant="h4"  className={classes.sectitle} > Sit in Course Request</Typography>

                                <List dense={false}>
                                    {renderNotiMessage('sitNotice')}
                                </List>
                                <Typography variant="h4" noWrap className={classes.sectitle} > Forum Updates</Typography>

                                <List dense={false}>
                                    {renderNotiMessage('forumNotice')}
                                </List>
                                {userType === 'student' && <List dense={false}>
                                    <Typography variant="h4" noWrap className={classes.sectitle} > Course Updates</Typography>


                                    {renderNotiMessage('courseNotice')}
                                </List>}

                            </div>
                        </Paper>
                        {/* </div> */}
                    </Grid>

                </Grid>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    key={`top,$left`}
                    open={Open}
                    onClose={handleClose}>
                    <SnackbarContent style={{
                        backgroundColor: (AlertMessage === "Deleted!" || AlertMessage === 'Successfully Added!') ? '#84DE02' : '#FFBF00',
                    }}
                        message={<span id="client-snackbar">{AlertMessage}!</span>}
                    />
                </Snackbar>

            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {renderNoti()}
        </React.Fragment>
    )
}

export default NotificationPage
