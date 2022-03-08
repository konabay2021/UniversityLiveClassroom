import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from "../Component/SnackBar"
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { UserCourseList, UserType } from "../test"
import CourseTable from "../Component/CourseTable"
import Divider from '@material-ui/core/Divider';
import PeopleIcon from '@material-ui/icons/People';
import TextField from '@material-ui/core/TextField'
import StartQuiz from './StartQuiz';
import { Link } from "react-router-dom";
import axios from "axios"

const useStyles = makeStyles(theme => ({

    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        [theme.breakpoints.up('md')]: {
            width: '80%',
          },

    },
    chartPaper: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    attendancePaper: {
        minHeight: '45vh'
    },
    divider: {
        marginBottom: 10,
        marginTop: 8,
    },
    quizqContainer: {
        [theme.breakpoints.up('md')]: {
            width: '50% !important',
          },
       
        margin: '0 auto'
    },
    questionfield: {
        margin: '25px 0'
    },
    container: {
        minHeight: " calc(100vh - 156px )",
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

let profquestion = [{}]
let answer = []
let Quiz = (props) => {
    const classes = useStyles();
    const { userType } = useContext(UserType)
    const [Course, setCourse] = useState()
    const [createQuiz, setCreateQuiz] = useState()
    const [questionNubmer, setQuestionNubmer] = useState(1)
    const [question, setQuestion] = useState(null)
    const [studQuizQ, setStudQuizQ] = useState(false)
    let [success, setSuccess] = useState()
    let [alertMessage, setAlertMessage] = useState()
    let [openAlert, setOpenAlert] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [score, setScore] = useState(null)
    const [startQuiz, setStartQuiz] = useState(false)
    const { courselist, courselistDispatch } = useContext(UserCourseList);


    useEffect(() => {
        axios.post('/api/quiz/student/', { 'courseCode': Course }, { withCredentials: true }).then(response => response.data).then((response) => {
            if (response.redirectURL) {
                //back to login
                window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
            }
            else if (!response.error) {
                setQuestion(response.docs)
                setStartQuiz(true)
            }
            else {
                setQuestion(response)
            }
        })
    }, [Course])
    let profSendQuizQuestion = () => {
        profquestion = profquestion.slice(0, questionNubmer)
        answer = answer.slice(0, questionNubmer)
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         'courseCode': Course,
        //         'question': profquestion,
        //         'ans': answer
        //     })
        // };
        axios.post('/api/quiz/teacher',
            {
                'courseCode': Course, 'question': profquestion,
                'ans': answer
            },
            { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response)

                    setSuccess(true)
                    setAlertMessage('Create Successfully!')
                    setOpenAlert(true)
                }
                else {
                    console.log(response)
                    setSuccess(false)
                    setAlertMessage(response.error)
                    setOpenAlert(true)
                }
            })
        // fetch(`/api/quiz/teacher`, requestOptions)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             console.log(response)
        //             setSuccess(true)
        //             setAlertMessage('Create Successfully!')
        //             setOpenAlert(true)
        //         }
        //         else {
        //             console.log(response)
        //             setSuccess(false)
        //             setAlertMessage(response.error)
        //             setOpenAlert(true)
        //         }
        //     });

    }
    let studSendQuizQuestion = () => {
        if (answer.length !== question.length) {
            setSuccess(false)
            setAlertMessage('Please Answer All Question!')
            setOpenAlert(true)
            return
        }
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         'username': username,
        //         'ans': answer,
        //     })
        // };
        axios.post('/api/quiz/student/submit',
            {
                'ans': answer,
                'courseCode': Course
            },
            { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response)
                    setModalOpen(true)
                    setScore(response.docs.score)
                }
                else {
                    console.log(response.docs)
                    setSuccess(false)
                    setAlertMessage(response.error)
                    setOpenAlert(true)
                }
            })
        // fetch(`/api/quiz/student/submit`, requestOptions)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             console.log(response)
        //             setModalOpen(true)
        //             setScore(response.score)
        //         }
        //         else {
        //             console.log(response)
        //             setSuccess(false)
        //             setAlertMessage(response.error)
        //             setOpenAlert(true)
        //         }
        //     });

    }
    let checkQuizHistory = (type) => {
        props.history.push(`/Quiz/history/${Course ? Course  : 'Your'}`)
    }
    let handleStartOrEndQuiz = (value) => {
        setStartQuiz(value)
        axios.get(`/api/quiz/start/${Course}/${value}`,
            { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response.message)
                    setOpenAlert(true)
                    setSuccess(true)
                    setAlertMessage(response.message)
                }
                else {
                    console.log(response)
                    setSuccess(false)
                    setAlertMessage(response.error)
                    setOpenAlert(true)
                }
            })
        // fetch(`/api/quiz/start/${Course}/${value}`)
        //     .then(response => response.json())
        //     .then(response => {
        //         if (!response.error) {
        //             console.log(response.message)
        //             setOpenAlert(true)
        //             setSuccess(true)
        //             setAlertMessage(response.message)
        //         }
        //         else {
        //             console.log(response)
        //             setSuccess(false)
        //             setAlertMessage(response.error)
        //             setOpenAlert(true)
        //         }
        //     });
    }
    let handleQusChnage = (e, index) => {
        profquestion[index] = { ...profquestion[index] }
        profquestion[index][e.target.name] = e.target.value
    }
    let handleAnsChange = (value, index) => {
        answer[index] = value
    }
    let renderQuiz = () => {
        return (
            <React.Fragment>
                <div className={classes.container}>
                <Grid container>
                    <Grid item md={6} xs={12}>

                        <CourseTable
                            setChartOpen={setCourse}
                            setCourse={setCourse}
                        >
                            <Button variant="contained" color="default" onClick={checkQuizHistory}>Check Course Quiz Record</Button>
                        </CourseTable>
                    </Grid>

                    {Course ? userType === 'prof' ?
                        <Grid item md={6} xs={12}>
                            <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                                <PeopleIcon fontSize="large" /><br />
                                <Typography variant="h4" component="h4">{Course} Quiz</Typography>
                                <Divider className={classes.divider} />
                                <Typography variant="h6" component="h5">Selected Course: {Course}</Typography>
                                <Divider className={classes.divider} />
                                <Button variant="contained" onClick={() => setCreateQuiz(true)} >Create Quiz</Button>
                                <Divider className={classes.divider} />

                                {startQuiz ? <Button variant="contained" color="secondary" onClick={() => handleStartOrEndQuiz(0)}>End Quiz</Button> :
                                    <Button variant="contained" color="primary" onClick={() => handleStartOrEndQuiz(1)}>Start Quiz</Button>}
                                <Divider className={classes.divider} />
                                <Button variant="contained" color="default" onClick={checkQuizHistory}>Check Course Quiz Record</Button>
                            </Paper>
                        </Grid>
                        : <Grid item md={6} xs={12}>
                            <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                                <PeopleIcon fontSize="large" /><br />
                                <Typography variant="h4" component="h4">{Course} Quiz</Typography>
                                <Divider className={classes.divider} />
                                <Typography variant="h6" component="h5">Selected Course: {Course}</Typography>
                                <Divider className={classes.divider} />
                                {question && Array.isArray(question) && score === null ? <Button variant="contained" onClick={() => setStudQuizQ(true)} color="primary">Start Quiz</Button>
                                    : <Button variant="contained" onClick={() => setStudQuizQ(true)} color="secondary">Submitted</Button>
                                }

                                <Divider className={classes.divider} />
                                <Button variant="contained" color="default" onClick={checkQuizHistory}>Check Course Quiz Record</Button>
                            </Paper>
                        </Grid>
                        : <Grid item md={6} xs={12}>
                            <Paper className={`${classes.attendancePaper} ${classes.paper}`}>
                            </Paper>
                        </Grid>
                    }
                </Grid>
                {createQuiz && renderProfQuizQuestionCreater()}
                {studQuizQ && Array.isArray(question) && renderStudQuizQuestion()}
                <Snackbar
                    success={success}
                    Open={openAlert}
                    AlertMessage={alertMessage}
                    handleClose={() => {
                        setOpenAlert(false)
                    }}

                />
                {modalOpen && <Dialog fullWidth={true} maxWidth={'md'} open={modalOpen} onClose={() => setModalOpen(false)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Submitted Successfully! Your Score: </DialogTitle>
                    <DialogContent>
                        <h4> {score}/{question.length} </h4>
                            <Button variant="contained" color="default" onClick={checkQuizHistory}>Check Course Quiz Record</Button>
                    </DialogContent>
                </Dialog>}
                </div>
            </React.Fragment>
        )
    }
    let renderProfQuizQuestionCreater = () => {
        return (
            <Grid container  >
                <Grid item xs={12}>
                    <Paper className={` ${classes.paper} ${classes.chartPaper}`}>
                        {[...Array(questionNubmer).keys()].map((i, index) => {
                            return (
                                <Grid container className={classes.quizqContainer}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" component="h5">Question {i + 1}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Question" margin="dense" multiline rows='2' className={classes.questionfield}
                                            onBlur={(e) => handleQusChnage(e, index)}
                                            name="Question" required variant="outlined" />
                                    </Grid>
                                    {/* Last Name */}
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Option A" margin="dense"
                                            onBlur={(e) => handleQusChnage(e, index)}
                                            name="A" required variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Option B" margin="dense"
                                            onBlur={(e) => handleQusChnage(e, index)}
                                            name="B" required variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Option C" margin="dense"
                                            onBlur={(e) => handleQusChnage(e, index)}
                                            name="C" required variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Option D" margin="dense"
                                            onBlur={(e) => handleQusChnage(e, index)}
                                            name="D" required variant="outlined" />
                                    </Grid>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={''}
                                            // value={age}
                                            onChange={(e) => handleAnsChange(e.target.value, index)}
                                        >
                                            <MenuItem value={'A'}>Option A</MenuItem>
                                            <MenuItem value={'B'}>Option B</MenuItem>
                                            <MenuItem value={'C'}>Option C</MenuItem>
                                            <MenuItem value={'D'}>Option D</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            )
                        })}
                        <Button variant="contained" onClick={() => setQuestionNubmer(questionNubmer + 1)} color="default">Add Question</Button>
                        <Divider className={classes.divider} />
                        <Button variant="contained" onClick={() => setQuestionNubmer(questionNubmer ? questionNubmer - 1 : 0)} color="secondary">Remove Question</Button>
                        <Divider className={classes.divider} />
                        <Button variant="contained" onClick={() => profSendQuizQuestion()} color="primary">Sumbmit Quiz To Server</Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
    let renderStudQuizQuestion = () => {
        return (
            <Grid container  >
                <Grid item xs={12}>
                    <Paper className={` ${classes.paper} ${classes.chartPaper}`}>
                        {question && question.map((item, index) => {
                            return (
                                <Grid container className={classes.quizqContainer}>

                                    <Typography className={classes.textCenter} variant="h5" component="h5">Question {index + 1}</Typography>
                                    <FormControl component="fieldset" className={classes.formControl}>
                                        <FormLabel component="legend">{item.Question}</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1"
                                            onChange={(e) => handleAnsChange(e.target.name, index)}>
                                            <FormControlLabel value={item.A} control={<Radio />} name='A' label={item.A} />
                                            <FormControlLabel value={item.B} control={<Radio />} name='B' label={item.B} />
                                            <FormControlLabel value={item.C} control={<Radio />} name='C' label={item.C} />
                                            <FormControlLabel value={item.D} control={<Radio />} name='D' label={item.D} />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            )
                        })}
                        <Button variant="contained" onClick={() => studSendQuizQuestion()} color="primary">Sumbmit Quiz!</Button>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            {courselist.length > 0 ? Array.isArray(courselist) ? renderQuiz() : <div>no course yet!</div> : <div>loading...</div>}
        </React.Fragment>
    )
}

export default Quiz
