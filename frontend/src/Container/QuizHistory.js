import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { std } from 'mathjs'
import Grid from '@material-ui/core/Grid';

import Autocomplete from '@material-ui/lab/Autocomplete';
import FullPaperPageHeader from '../Component/FullPaperPageHeader'
import { UserType, UserCourseList, UserInfo } from "../test"
import axios from "axios"
import BarChart from "../Component/BarChart"
import MixedChart from "../Component/MixedChart"
import QuizQuestion from "../Component/QuizQuestion"

let QuizHistory = (props) => {
    let width = props.width?props.width:'70%'
    const useStyles = makeStyles(theme => ({
        title: {
            color: '#B9B9B9',
            paddingTop: '15px',
            paddingBottom: '15px'
        },
        completeBox: {
            padding: '30px 0',
            [theme.breakpoints.up('md')]: {
                width: width,
              },
        },
        message: {
            paddingBottom: '25px',
        },
        completeBox: {
            padding: '30px 0',
            [theme.breakpoints.up('md')]: {
                width: '70%',
            },
        },
    
    
    }));
    const classes = useStyles();
    let [AvaCourse, setAvaCourse] = useState()
    let [Course, setCourse] = useState(props.match.params.course && props.match.params.course)
    let [success, setSuccess] = useState()
    let [alertMessage, setAlertMessage] = useState()
    let [openAlert, setOpenAlert] = useState()
    let [result, setResult] = useState()
    let [loading, setLoading] = useState()

    const { userType } = useContext(UserType)
    const { courselist, courselistDispatch } = useContext(UserCourseList);
    const [quizNumber, setQuizNumber] = useState()
    console.log(userType)

    var filtered
    let checkifEnrolled = () => {
        if (props.match.params.course === undefined || props.match.params.course === 'Your') {
            return true
        }
        filtered = courselist.length > 0 && Array.isArray(courselist) && courselist.filter(i => {
            return i.code === props.match.params.course
        })
        if (filtered.length > 0) {
            return true
        } else if (courselist.length > 0) {
            window.location.href = process.env.REACT_APP_PRODUCTION_KEY + '/404'
        }
    }

    useEffect(() => {
        //fetch all quiz result
        let filered = []
        filered = courselist && Array.isArray(courselist) && courselist.filter(i => i.code === Course)
        if (Course && filered.length > 0) {
            setLoading(true)

            axios.get(`/api/quiz/result/${Course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setResult(response.docs)
                    setLoading(false)
                    console.log(response.docs)
                }
                else {
                    setResult(false)
                    
                    setLoading(false)
                    alert(response.error)
                }
            })
        }
    }, [Course, courselist])


    let calAverage = () => {
        let tmparr = []
        result.socredist.map(item => {
            let sum = item.reduce((a, b) => a + b, 0)
            let avg = sum / item.length
            tmparr.push(avg)
        })
        return tmparr
    }
    let renderQuizQNA = () => {
        return (
            <React.Fragment>
                <h2>Quiz Number {quizNumber}</h2>
                <QuizQuestion
                    question={result.question[quizNumber - 1]}
                    ans={result.ans[quizNumber - 1]}
                    userscore={result.userscore[quizNumber - 1].ans}
                >


                </QuizQuestion>
            </React.Fragment>

        )
    }

    let renderAddCourse = () => {

        return (
            <React.Fragment>
                <FullPaperPageHeader minheight={props.minheight && props.minheight } width={props.width ? props.width :'70%'} title={`${props.match.params.course === undefined ? '' : Course} My Quiz Record`} body1={'Select Course To View Your Quiz Result!'}>
                    <div>
                        {Array.isArray(courselist) &&
                            <Autocomplete
                                id="combo-box-demo"
                                options={courselist}
                                autoFocus
                                className={classes.completeBox}
                                getOptionLabel={(courselist) => courselist.code}
                                onChange={(e, value) => setCourse(value && value.code)}
                                renderInput={(params) => <TextField {...params} label="Search or select for a course" variant="outlined" />}
                            />
                        }
                        {result && result.userscore && <h2>Selected Course: {Course}</h2>}
                        {loading && <h2>Loading...</h2>}
                        {!Array.isArray(courselist) && courselist.length >0  && <h2>You Have Not Enrolled In Any Course!</h2>}


                        {result && result.userscore &&
                            <React.Fragment>
                                <Grid container>
                                    <Grid item md={6}>
                                    {userType === 'student' &&
                                    <BarChart
                                        data={result.userscore.map(i => i.score)}
                                        label={result.userscore.map((i, index) => index + 1)}
                                        title={`Your Score Record`}
                                    />}
                                    </Grid>
                                    <Grid item md={6}>
                                    <MixedChart
                                    data0={result.socredist.map(i => std(i))}
                                    data1={calAverage()}
                                    label={result.userscore.map((i, index) => (index + 1))}
                                    title={`Overall Class Result (Mean And SD)`}
                                    label1={'SD'}
                                    label0={'Class Average'}
                                />
                                    </Grid>
                                    <Grid item md={6}>
                                  
                                    {userType === 'student' &&
                                    <MixedChart
                                        data0={result.userscore.map(i => i.score)}
                                        data1={calAverage()}
                                        label={result.userscore.map((i, index) => index + 1)}
                                        title={`Compare To Overall Class (Your Score VS Overall Class)`}
                                        label0={'Your Score'}
                                        label1={'Class Average'}
                                    />}
                                    </Grid>
                                    <Grid item xs={12}>
                                    {userType === 'student' &&
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={result.userscore.map((i, index) => 'Quiz No.' + (index + 1))}
                                        autoFocus
                                        className={classes.completeBox}
                                        getOptionLabel={(e) => e}
                                        onChange={(e, value) => setQuizNumber(value && value.slice(8))}
                                        renderInput={(params) => <TextField {...params} label="Check Quiz Question And Answer " variant="outlined" />}
                                    />
                                }
                                    </Grid>
                                </Grid>
                                

                              

                            </React.Fragment>
                        }
                        {quizNumber && renderQuizQNA()}

                    </div>
                </FullPaperPageHeader>

            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            {checkifEnrolled() ? renderAddCourse() : <div>Loading...</div>}
        </React.Fragment>
    )
}

export default QuizHistory
