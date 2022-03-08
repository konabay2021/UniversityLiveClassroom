import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { CssBaseline, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar'
import Snackbar from '../Component/SnackBar';
import CloseIcon from '@material-ui/icons/Close';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import axios from "axios"


const useStyles = makeStyles(theme => ({

    title: {
        color: '#B9B9B9',
        paddingTop: '15px',
        paddingBottom: '15px'
    },

    mainGrid: {
        marginTop: theme.spacing(3),
    },

    media: {
        height: 140,
    },

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },

    paperContent: {
        textAlign: 'left',
        justify: 'justified',
        fontSize: 16,
    },

    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    main: {
        flex: 1,
        marginTop: theme.spacing(4),
    },

    divider: {
        marginBottom: 10,
        marginTop: 8,
    },

    dialogContent: {
        textAlign: 'center',
    },
    message: {
        paddingBottom: '25px',
    },

    container: {
        minHeight: " calc(100vh - 64px )",
        maxHeight: " calc(100vh - 64px )",
    },

    uploadButton: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
    },

    button: {
        marginTop: theme.spacing(1),
    },

    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        height: theme.spacing(9),
        margin: '0 auto'
    },

}));

export default function UserProfile() {
    const classes = useStyles();
    let [Message, setMessage] = useState('')
    let [selectedFile, setSelectedFile] = useState()
    let [success, setSuccess] = useState()
    let [alertMessage, setAlertMessage] = useState()
    let [open, setOpen] = useState()
    let [loading, setLoading] = useState()
    let [oldpw, setOldpw] = useState()

    let [newpw, setNewpw] = useState()
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
        // if (JSON.parse(localStorage.getItem('info'))) {
        //     let username = JSON.parse(localStorage.getItem('info')).username
        //     // get notification form server
        //     fetch(`/api/user/info/${username}`)
        //       .then(response => response.json())
        //       .then(response => {
        //         if (!response.error) {
        //           console.log(response)
        //           setValues({
        //             // ...users,
        //             ...response
        //         });
        //         }
        //         else {
        //         //   setNotice(response.error)
        //         }
        //       });
        //   }
    }, [])
    const handleChangePW = () => {
        if (oldpw && newpw) {
            // let username = JSON.parse(localStorage.getItem('info')).username
            axios.post(`/api/user/editpw`, { 'oldpw': oldpw, 'newpw': newpw }, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setSuccess(true)
                    console.log(response)
                    setAlertMessage(response.docs)
                    setOpen(true)
                }
                else {
                    console.log(response)
                    setSuccess(false)
                    setAlertMessage(response.error)
                    setOpen(true)
                }
            })
            // const requestOptions = {
            //     method: 'POST',
            // headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({'oldpw':oldpw,'newpw':newpw })
            //   };
            //   fetch(`/api/user/editpw/${username}`, requestOptions)
            //     .then(response => response.json())
            //     .then(response => {
            //       if (!response.error) {
            //         setSuccess(true)
            //         console.log(response)
            //         setAlertMessage(response)
            //         setOpen(true)
            //       }
            //       else{
            //         console.log(response)
            //         setSuccess(false)
            //         setAlertMessage(response.error)
            //         setOpen(true)
            //       }
            //     });
        }

    }
    const handleClick = () => {
        // console.log(JSON.stringify(users))
        // let username = JSON.parse(localStorage.getItem('info')).username
        // const requestOptions = {
        //     method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(users)
        //   };
        axios.post(`/api/user/edit`, users, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setSuccess(true)
                console.log(response)
                setAlertMessage('Success!')
                setOpen(true)
            }
            else {
                console.log(response)
                setSuccess(false)
                setAlertMessage(response.error)
                setOpen(true)
            }
        })

        //   fetch(`/api/user/edit/${username}`, requestOptions)
        //     .then(response => response.json())
        //     .then(response => {
        //       if (!response.error) {
        //         setSuccess(true)
        //         console.log(response)
        //         setAlertMessage('Success!')
        //         setOpen(true)
        //       }
        //       else{
        //         console.log(response)
        //         setSuccess(false)
        //         setAlertMessage(response.error)
        //         setOpen(true)
        //       }
        //     });
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const handleChange = event => {
        setValues({
            ...users,
            [event.target.name]: event.target.value
        });
    };

    let onChangeHandler = event => {
        setSelectedFile(event.target.files[0])
    }
    let onClickHandler = () => {
        setLoading(true)
        const formData = new FormData()
        // let username = JSON.parse(localStorage.getItem('info')).username

        formData.append('recfile', selectedFile)
        // const requestOptions = {
        //     method: 'POST',
        //     body: formData
        // };
        axios.post(`/api/uploadPropic`, formData, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setSuccess(true)
                console.log(response.url)
                setAlertMessage('Success!')
                setOpen(true)
                setLoading(false)
            }
            else {
                console.log(response)
                setSuccess(false)
                setAlertMessage(response.error)
                setLoading(false)
                setOpen(true)
            }
        })

        // fetch(`/api/uploadPropic/${username}`, requestOptions)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             setSuccess(true)
        //             console.log(response.url)
        //             setAlertMessage('Success!')
        //             setOpen(true)
        //             setLoading(false)

        //         }
        //         else {
        //             console.log(response)
        //             setSuccess(false)
        //             setAlertMessage(response.error)
        //             setLoading(false)
        //             setOpen(true)
        //         }
        //     });
    }
    console.log(users)

    let renderProfileInfo = () => {
        return (
            <React.Fragment>
                <Grid item xs={12} md={6}>
                    <Paper className={classes.paper}>
                        <AccountCircleIcon fontSize="large" color="inherit" />
                        <Typography variant="h5" noWrap>My Profile</Typography>
                        <Divider className={classes.divider} />
                        <div className={classes.paperContent}>
                            <Grid container spacing={3}>
                                {/* First Name*/}
                                <Grid item md={6} xs={12}>
                                    <TextField fullWidth helperText="Please specify the first name" label="First name" margin="dense"
                                        name="firstname" required onChange={handleChange} value={users.firstname} variant="outlined" />
                                </Grid>
                                {/* Last Name */}
                                <Grid item md={6} xs={12}>
                                    <TextField fullWidth label="Last name" margin="dense"
                                        name="lastname" required onChange={handleChange} value={users.lastname} variant="outlined" />
                                </Grid>
                                {/* Email Address */}
                                <Grid item md={12} xs={12}>
                                    <TextField fullWidth label="Email" margin="dense" 
                                        name="email" required onChange={handleChange} value={users.email} variant="outlined" />
                                </Grid>
                                {/* Major */}
                                <Grid item md={12} xs={12}>
                                    <TextField fullWidth label="Major" margin="dense"
                                        name="major" onChange={handleChange} value={users.major} variant="outlined" />
                                </Grid>
                                {/* Minor */}
                                <Grid item md={12} xs={12}>
                                    <TextField fullWidth label="Minor(s)" margin="dense"
                                        name="minor" onChange={handleChange} value={users.minor} variant="outlined" />
                                </Grid>
                                <Grid item md={12} xs={12}>

                                    <TextField
                                        name="intro"
                                        className={classes.message}
                                        value={users.intro}
                                        onChange={handleChange}
                                        margin="dense" id="comments"
                                        variant="outlined" label="Self Introduction" type="text" rows="5"
                                        fullWidth multiline />
                                </Grid>

                            </Grid>
                            <Divider className={classes.divider} />
                        </div>
                        <Button color="primary" variant="contained" onClick={handleClick}>Save Details</Button>
                        <Snackbar
                            success={success}
                            Open={open}
                            AlertMessage={alertMessage}
                            handleClose={handleClose}
                        />
                    </Paper>
                </Grid>
            </React.Fragment>
        )
    }

    let renderProfile = () => {
        return (
            <React.Fragment>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <PersonOutlineIcon fontSize="large" color="inherit" />
                                <Typography variant="h5" noWrap>My Avatar</Typography>
                                <Divider className={classes.divider} />
                                <Avatar className={classes.large} src={users.pic} ></Avatar>
                                <Typography variant="h6" gutterBottom>{users.firstname} {users.lastname}</Typography>
                                <Typography variant="body1" gutterBottom>{users.major}</Typography>
                                <Typography nowrap={false} variant="body1" gutterBottom>{users.intro}</Typography>

                                <Divider className={classes.divider} />
                                <input type="file" name="recfile" onChange={onChangeHandler} />
                                {selectedFile && <Button onClick={onClickHandler} className={classes.uploadButton} color="primary" variant="contained">
                                    Upload picture
                                </Button>}
                                {loading && <div><h6>Uploading.....</h6></div>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <VpnKeyIcon fontSize="large" color="inherit" />
                                <Typography variant="h5" noWrap>Update Password</Typography>
                                <Divider className={classes.divider} />
                                <div className={classes.paperContent}>
                                    <Grid container spacing={3}>
                                        {/* old pw */}
                                        <Grid item md={6} xs={12}>
                                            <TextField fullWidth helperText="" label="Old Password" margin="dense"
                                                type="password"
                                                id="standard-password-input"
                                                name="oldpw" required onChange={(e) => setOldpw(e.target.value)} value={oldpw} variant="outlined" />
                                        </Grid>
                                        {/* new pw */}
                                        <Grid item md={6} xs={12}>
                                            <TextField fullWidth label="New Password" margin="dense"
                                                type="password"
                                                id="standard-password-input"
                                                name="newpw" required onChange={(e) => setNewpw(e.target.value)} value={newpw} variant="outlined" />
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider} />
                                </div>
                                <Button color="primary" variant="contained" onClick={handleChangePW}>Update Password</Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>


            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className={classes.app}>
                <CssBaseline />
                <div className={classes.main}>
                    <Grid container>
                        {renderProfileInfo()}
                        {renderProfile()}
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    )
}
