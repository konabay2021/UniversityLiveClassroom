import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
    let [attendanceRecord, setAttendanceRecord] = useState()
    let [generatedPin, setGeneratedPin] = useState(false)

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
        if (props.type === 'prof') {
            if (props.course) {
                axios.get(`/api/attendance/teacher/getAttendance/${props.course}`, { withCredentials: true }).then(response => response.data).then((response) => {
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
            } 
        }else {
            if (props.course) {
                console.log("sadkhs")
                axios.get(`/api/attendance/student/${props.course}`, { withCredentials: true }).then(response => response.data).then((response) => {
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
            }
        }
    }, [])

    let handleCheckRecord = () => {
        setChartOpen(true)
        if (props.course) {
            axios.get(`/api/attendance/student/${props.course}`, { withCredentials: true }).then(response => response.data).then((response) => {
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
        }
    }
    let handleProfCheckRecord = () => {
        setChartOpen(true)
        if (props.course) {
            axios.get(`/api/attendance/teacher/getAttendance/${props.course}`, { withCredentials: true }).then(response => response.data).then((response) => {
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
                                >{props.course}</Typography>
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
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
            {props.type === 'prof' ? renderProfChart() : renderStudentChart()}
        </React.Fragment>
    )
}

export default Attendance
