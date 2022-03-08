import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CssBaseline, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Autocomplete from '@material-ui/lab/Autocomplete';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { CSVReader } from 'react-papaparse'
import axios from "axios"

const useStyles = makeStyles(theme => ({
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(10),
    },
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        marginTop: theme.spacing(3),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    csvuploadContainer: {
        marginBottom: '75px'
    }
}));

const CourseOfferingDepartment = [
    { long: "Accountancy", short: "ACCT" },
    { long: "Artifical Intelligence: Systems and Technologies", short: "AIST" },
    { long: "Mathematics and Mathematics Education", short: "BMED" },
    { long: "Computer Science", short: "CSCI" },
    { long: "Communication", short: "COMM" },
    { long: "Education", short: "EDUC" },
    { long: "English", short: "ENGE" },
    { long: "Mathematics", short: "MATH" },
    { long: "Music", short: "MUSC" },
    { long: "Physics", short: "PHYS" },
    { long: "Social", short: "SOWK" },
    { long: "Statistics", short: "STAT" },
    { long: "Translation", short: "TRANS" },
];

export default function AdminInput() {
    const classes = useStyles();
    const [course, SetCourse] = useState({
        department: '',
        code: "",
        title: '',
        lecturer: '',
        username: '',
        student: []
    })
    const handleChange = event => {
        SetCourse({
            ...course,
            [event.target.name]: event.target.value
        });
    };
    const handleDepartmentChange = (event, value) => {
        SetCourse({
            ...course,
            department: value && value.long 
        });
    }
    console.log(course)
    let handleOnDrop = (data) => {
        console.log('---------------------------')
        data.shift()
        SetCourse({
            ...course,
            student: data && data.map(i => i.data[0])})
        console.log('---------------------------')
    }

    let handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    let handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }
    let addCourseToDB =()=>{
        axios.post(`/api/admin`, course, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                // setSuccess(true)
                console.log(response)
                // setAlertMessage('Success!')
                // setOpen(true)
                // setLoading(false)
            }
            else {
                console.log(response)
                // setSuccess(false)
                // setAlertMessage(response.error)
                // setLoading(false)
                // setOpen(true)
            }
        })
    }

    return (
        <React.Fragment>
            <div className={classes.app}>

                <Container component="main">
                    <Paper className={classes.paper}>
                        <SupervisorAccountIcon fontSize="large" />
                        <Typography component="h3" variant="h4">
                            Admin Input Page
                </Typography>
                        <Divider className={classes.divider} />
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6"> Add Student To Course (Format: 1 Column Named Student, follow with student's username)</Typography>
                                    <div className={classes.csvuploadContainer}>
                                        <CSVReader
                                            onDrop={handleOnDrop}
                                            onError={handleOnError}
                                            addRemoveButton
                                            onRemoveFile={handleOnRemoveFile}
                                        >
                                            <span>Drop CSV file here to add student to course.</span>
                                        </CSVReader>
                                    </div>

                                </Grid>
                                <Grid item xs={12}>
                      

                                        <Typography component="p" variant="h6"> Student List: </Typography>

                                        {course.student.map(i => {
                                            return (
                                                <Typography component="div" variant="subtitle1"> {i}</Typography>

                                            )
                                        })}
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Autocomplete id="Course-Dept" options={CourseOfferingDepartment} getOptionLabel={(option) => option.short + ' - ' + option.long}
                                        onChange={handleDepartmentChange} renderInput={(params) => <TextField {...params} name='department' label="Course Offering Department" variant="outlined" />} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth helperText="4-digit Code of the Course" label="Course Code" margin="dense"
                                        onChange={handleChange} name="code" required variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Course Title" margin="dense"
                                        onChange={handleChange} name="title" required variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Course Lecturer" margin="dense"
                                        onChange={handleChange} name="lecturer" required variant="outlined" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth onChange={handleChange} label="Username of Lecturer" margin="dense" name="username" required variant="outlined" />
                                </Grid>

                            </Grid>
                        </form>
                        <Divider className={classes.divider} />
                        <Button onClick={addCourseToDB} variant="contained" color="primary">Submit</Button>
                    </Paper>
                </Container>
            </div>
        </React.Fragment>
    )
}
