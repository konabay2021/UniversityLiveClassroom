import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import PeopleIcon from '@material-ui/icons/People';
import CourseTable from "../Component/CourseTable";
import PinInput from "react-pin-input";
import SnackBar from "../Component/SnackBar"
import { UserType, UserCourseList } from "../test"
import axios from "axios"

import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Tooltip,
    Pie,
    YAxis,
    XAxis,
} from "recharts";


const useStyles = makeStyles(theme => ({
    root: {
        width: 900,
    },
    mainChartHeaderLabels: {
        display: "flex",
        alignItems: "center",
    },
    mainChartLegentElement: {
        fontSize: "18px !important",
        marginLeft: theme.spacing(1),
    },

    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    main: {
        flex: 1,
    },

    divider: {
        marginBottom: 10,
        marginTop: 8,
    },

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    courseListPaper: {
        float: 'right',
        minHeight: '60vh'
    },
    attendancePaper: {
        minHeight: '45vh'
    },
    profgenCodePaper: {
        float: 'right',
        minHeight: '45vh'
    },
    paperContent: {
        textAlign: 'left',
        justify: 'justified',
        fontSize: 16,
    },
    checkAttendancePaper: {
        minHeight: 'calc(15vh - 8px)'
    },
    chartPaper: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },

    container: {
        // maxHeight: 560,
    },

    tableHead: {
        fontSize: 22,
        textAlign: 'center'
    },
    tableRow: {
        '&:hover': {
            background: '#F1F1F1 !important',
            cursor: 'pointer'
        }
    },

    tablecell: {
        fontSize: 16,
        textAlign: 'center',
    },
}));



let Attendance = (props) => {
    const classes = useStyles();
    let [pin, setPin] = useState()
    let [course, setCourse] = useState()
    let [attendanceRecord, setAttendanceRecord] = useState()
    let [generatedPin, setGeneratedPin] = useState(false)
    const { userType } = useContext(UserType)
    const { courselist, courselistDispatch } = useContext(UserCourseList);

    let [Open, setOpen] = useState('')
    let [AlertMessage, setAlertMessage] = useState()
    let [success, setSuccess] = useState()
    let [chartOpen, setChartOpen] = useState(false)

    let pinOnChange = (value) => {
        setPin(value)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setPin(null)
        setAttendanceRecord(null)
        setGeneratedPin(null)
        if (course && userType === 'prof') {
            axios.get(`/api/attendance/teacher/checkPin/${course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setGeneratedPin(response.docs)
                }

            })

            // fetch(`/api/attendance/teacher/checkPin/${course}`)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (!response.error) {
            //             setGeneratedPin(response)
            //         }
            //     });
        }
    }, [course])
    let handlePinSubmit = () => {
        if (pin) {
            // const requestOptions = {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         'courseCode': course,
            //         'attendanceCode': pin,
            //         'username': JSON.parse(localStorage.getItem('info')).username
            //     })
            // };
            axios.post(`/api/attendance/student`, {
                'courseCode': course,
                'attendanceCode': pin,
            }, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setAlertMessage('Success!')
                    setSuccess(true)
                    setOpen(true)
                } else {
                    setAlertMessage(response.error)
                    setSuccess(false)
                    setOpen(true)
                }
            })
            // fetch('/api/attendance/student', requestOptions)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (!response.error) {
            //             setAlertMessage('Success!')
            //             setSuccess(true)
            //             setOpen(true)
            //         }
            //         else {
            //             setAlertMessage(response.error)
            //             setSuccess(false)
            //             setOpen(true)
            //         }
            //     });
        } else {
            setAlertMessage('please enter the pin!')
            setSuccess(false)
            setOpen(true)
        }
    }
    let handleCheckRecord = () => {
        setChartOpen(true)
        if (course) {
            axios.get(`/api/attendance/student/${course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setAttendanceRecord(response.docs[0])
                } else {
                    setAlertMessage('No record/error occur!')
                    setSuccess(false)
                    setOpen(true)
                    setChartOpen(false)
                }
            })
            // fetch(`/api/attendance/student/${course}/${JSON.parse(localStorage.getItem('info')).username}`)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (!response.error) {
            //             setAttendanceRecord(response[0])
            //         }
            //         else {
            //             setAlertMessage('No record/error occur!')
            //             setSuccess(false)
            //             setOpen(true)
            //             setChartOpen(false)
            //         }
            //     });
        }
    }
    let handleProfCheckRecord = () => {
        setChartOpen(true)
        if (course) {
            axios.get(`/api/attendance/teacher/getAttendance/${course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response)
                    setAttendanceRecord(response.docs[0])
                } else {
                    setAlertMessage(response.error)
                    setSuccess(false)
                    setOpen(true)
                    setChartOpen(false)
                }
            })
            // fetch(`/api/attendance/teacher/getAttendance/${course}`)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (!response.error) {
            //             console.log(response)
            //             setAttendanceRecord(response[0])
            //         }
            //         else {
            //             setAlertMessage(response.error)
            //             setSuccess(false)
            //             setOpen(true)
            //             setChartOpen(false)

            //         }
            //     });
        }
    }

    let handlePinGenerate = () => {
        if (course) {
            axios.get(`/api/attendance/teacher/getPin/${course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response)
                    setGeneratedPin(response.docs)
                } else {
                    setAlertMessage('No record/error occur!')
                    setSuccess(false)
                    setOpen(true)
                }
            })
            // fetch(`/api/attendance/teacher/getPin/${course}`)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (!response.error) {
            //             setGeneratedPin(response)
            //         }
            //         else {
            //             setAlertMessage('No record/error occur!')
            //             setSuccess(false)
            //             setOpen(true)
            //         }
            //     });
        }
    }
    let handleCloseAttendance = () => {
        axios.get(`/api/attendance/teacher/closeAttendance/${course}`, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setGeneratedPin(false)
            } else {
                setAlertMessage('No record/error occur!')
                setSuccess(false)
                setOpen(true)
            }
        })

        // fetch(`/api/attendance/teacher/closeAttendance/${course}`)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             setGeneratedPin(false)
        //         }
        //         else {
        //             setAlertMessage('No record/error occur!')
        //             setSuccess(false)
        //             setOpen(true)
        //         }
        //     });
    }
    let calGeneralAttendRate = () => {
        if (attendanceRecord && attendanceRecord.attendanceDate && Object.keys(attendanceRecord.student).length > 0) {
            let tmp = []
            for (const key in attendanceRecord.student)
                tmp.push(attendanceRecord.student[key])
            let rate = sumArrays(...tmp)
            let len = rate.length
            let chartData = [];
            for (let i = 0; i < len; i++)
                chartData.push({ 'userRate': rate[i] })
            console.log(chartData)
            return chartData
        }
    }
    let sumArrays = (...arrays) => {
        const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
        const result = Array.from({ length: n });
        return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
    }

    let calcAttendRate = () => {
        if (attendanceRecord && attendanceRecord.rate) {
            let rate = []
            let len = attendanceRecord.rate.length
            for (let i = 0; i < len; i++) {
                if (i == 0)
                    rate.push({ 'userRate': (attendanceRecord.rate[i]) / 1 * 100 })
                else
                    rate.push({ 'userRate': (rate[i - 1].userRate * (i) / 100 + parseInt(attendanceRecord.rate[i])) / (i + 1) * 100 })
            }
            return rate
        }
    }

    let renderAttendace = () => {
        return (
            <React.Fragment>
                <div className={classes.app}>
                    <CssBaseline />
                    <div className={classes.main}>
                        <Grid container>
                            {/* List of Courses registered by the user / professor */}
                            <Grid item md={6} xs={12}>

                                <CourseTable
                                    courselist={courselist}
                                    setChartOpen={setChartOpen}
                                    setCourse={setCourse}
                                    type={'Attendance'}
                                />
                            </Grid>
                            {/* If a Course is selected and prof is taking attendance, show below, 
                        otherwise return "No attendance required for this course"*/}
                            {course ? userType === 'student' ?
                                <Grid item xs={12} md={6}>
                                    <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                                        <PeopleIcon fontSize="large" /><br />
                                        <Typography variant="h4" component="h4">Verify {course} Attendance</Typography>
                                        <Divider className={classes.divider} />
                                        <Typography variant="h6" component="h5">Selected Course: {course}</Typography>
                                        <Typography variant="h6" component="h5">Enter the 4 Digit Code your Teacher gave you</Typography>
                                        <PinInput
                                            length={4}
                                            focus
                                            style={{ padding: '30px 0' }}
                                            // ref={pin}
                                            type="numeric"
                                            onChange={pinOnChange}
                                        />
                                        <Divider className={classes.divider} />
                                        <Button variant="contained" onClick={handlePinSubmit} color="primary">Sumbit Pin</Button>
                                    </Paper>
                                    <Paper className={`${classes.checkAttendancePaper} ${classes.paper}`}>
                                        <Typography variant="h4" component="h4">Check {course} Attendance Record</Typography>
                                        <Divider className={classes.divider} />
                                        <Button variant="contained" onClick={handleCheckRecord} color="primary">Check Record</Button>
                                    </Paper>
                                </Grid>
                                : <Grid item xs={12} md={6}>
                                    <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                                        <PeopleIcon fontSize="large" /><br />
                                        <Typography variant="h4" component="h4">Generate {course} Attendance Code</Typography>
                                        <Divider className={classes.divider} />
                                        <Typography variant="h6" component="h5">Selected Course: {course}</Typography>
                                        <Divider className={classes.divider} />
                                        {!generatedPin ?
                                            <React.Fragment>
                                                <Button variant="contained" onClick={handlePinGenerate} color="primary">Generate Code</Button>
                                                <Divider className={classes.divider} />

                                                <Button variant="contained" onClick={handleProfCheckRecord} color="default">Check Course Attendance Record</Button>
                                            </React.Fragment>

                                            :
                                            <React.Fragment>
                                                <Typography variant="h4" component="h4">Generated Code: {generatedPin}</Typography>
                                                <Button variant="contained" onClick={handleCloseAttendance} color="secondary">Close Attendance</Button>

                                            </React.Fragment>
                                        }
                                    </Paper>
                                </Grid>
                                : <Grid item xs={12} md={6}>
                                    <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                                    </Paper>
                                </Grid>
                            }

                        </Grid>
                        {chartOpen ? userType === 'prof' ? renderProfChart() : renderStudentChart() : <div></div>}


                    </div>
                </div>
                <SnackBar
                    handleClose={handleClose}
                    Open={Open}
                    AlertMessage={AlertMessage}
                    success={success}
                />
            </React.Fragment>
        )
    }

    let renderProfChart = () => {
        if (attendanceRecord)
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={` ${classes.paper} ${classes.chartPaper}`}>

                            <div className={`${classes.mainChartHeader} `}>
                                <Typography
                                    variant="h5"
                                    color="#4A4A4A"
                                    colorBrightness="secondary"
                                >Attendance Line Chart (Nubmer of Students)</Typography>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <ComposedChart
                                    margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                                    data={calGeneralAttendRate()}
                                // data={mainChartData}
                                >
                                    <YAxis
                                        // ticks={[0, 1]}
                                        tick={{ fill: "#B9B9B9", fontSize: 14 }}
                                        stroke={'#B9B9B9'}
                                        tickLine={false}

                                    />
                                    <XAxis
                                        tickFormatter={i => i + 1}
                                        tick={{ fill: "#B9B9B9", fontSize: 14 }}
                                        stroke={"#B9B9B9"}
                                        tickLine={false}
                                        label={{ value: "Lecture", position: "insideLeft", angle: 0, dx: 10, dy: 10 }}
                                    />
                                    <Tooltip />

                                    <Area
                                        type="natural"
                                        dataKey="userRate"
                                        fill={'#1976d2'}
                                        strokeWidth={0}
                                        activeDot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={` ${classes.paper} ${classes.chartPaper}`}>

                            <div className={`${classes.mainChartHeader} `}>
                                <Typography
                                    variant="h5"
                                    color="#4A4A4A"
                                    colorBrightness="secondary"
                                >Class Attendance Record:</Typography>
                            </div>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>
                                                <Typography variant="h6" noWrap>Student</Typography>
                                            </TableCell>
                                            {attendanceRecord && attendanceRecord.attendanceDate && attendanceRecord.attendanceDate.map((key, index) => {
                                                return <TableCell className={classes.tablecell}>{attendanceRecord.attendanceDate[index].slice(0, 10)}</TableCell>

                                            })}
                                        </TableRow>
                                    </TableHead>
                                    {/* User's Course List */}
                                    <TableBody>
                                        {attendanceRecord && attendanceRecord.attendanceDate && Object.keys(attendanceRecord.student).map((key, index) => {
                                            return (
                                                <TableRow className={classes.tableRow} >
                                                    <TableCell className={classes.tablecell}>{key}</TableCell>
                                                    {attendanceRecord.student[key].map((item, index) => {
                                                        return (
                                                            <TableCell className={classes.tablecell}> {item ? 'Attended' : 'Not Attended'} </TableCell>
                                                        )
                                                    })}


                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )
        else {
            return <div><h3>Loading...</h3></div>
        }
    }

    let renderStudentChart = () => {
        if (attendanceRecord)
            return (
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={` ${classes.paper} ${classes.chartPaper}`}>
                            <div className={`${classes.mainChartHeader} `}>
                                <Typography
                                    variant="h5"
                                    color="#4A4A4A"
                                    colorBrightness="secondary"
                                >Your Attendance Line Chart (In Percentage %)</Typography>
                            </div>
                            <ResponsiveContainer width="100%"  height={350}>
                                <ComposedChart
                                    margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                                    data={calcAttendRate()}
                                // data={mainChartData}
                                >
                                    <YAxis
                                        ticks={[0, 25, 50, 75, 100]}
                                        tick={{ fill: "#B9B9B9", fontSize: 14 }}
                                        stroke={'#B9B9B9'}
                                        tickLine={false}

                                    />
                                    <XAxis
                                        tickFormatter={i => i + 1}
                                        tick={{ fill: "#B9B9B9", fontSize: 14 }}
                                        stroke={"#B9B9B9"}
                                        tickLine={false}
                                        label={{ value: "Lecture", position: "insideLeft", angle: 0, dx: 10, dy: 10 }}
                                    />
                                    <Tooltip />
                                    <Area
                                        type="natural"
                                        dataKey="userRate"
                                        fill={'#1976d2'}
                                        strokeWidth={0}
                                        activeDot={false}
                                    />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper className={` ${classes.paper} ${classes.chartPaper}`}>

                            <div className={`${classes.mainChartHeader} `}>
                                <Typography
                                    variant="h5"
                                    color="#4A4A4A"
                                    colorBrightness="secondary"
                                >Your Attendance Record:</Typography>
                            </div>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHead}>
                                                <Typography variant="h6" noWrap>Date</Typography>
                                            </TableCell>
                                            <TableCell className={classes.tableHead}>
                                                <Typography variant="h6" noWrap>Attendance Record</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {/* User's Course List */}
                                    <TableBody>
                                        {attendanceRecord && attendanceRecord.attendanceDate && attendanceRecord.attendanceDate.map((item, index) => {
                                            return (
                                                <TableRow className={classes.tableRow} >
                                                    <TableCell className={classes.tablecell}>{item.slice(0, 10)}</TableCell>
                                                    <TableCell className={classes.tablecell}>{attendanceRecord.rate && attendanceRecord.rate[index] === 1 ? 'Attended' : 'Not Attended'}</TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            )
        else {
            return <div><h3>Loading...</h3></div>
        }
    }

    // let RedirectToLogin = () => {
    //     alert("You have not yet login!");
    //     const { history } = props;
    //     history.push('/login');
    // }
    return (
        <React.Fragment>
            {courselist.length > 0 ? Array.isArray(courselist) ? renderAttendace() : <div>no course yet!</div> : <div>loading...</div>}
        </React.Fragment>
    )
}

export default Attendance
