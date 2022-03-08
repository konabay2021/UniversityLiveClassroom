import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { std } from 'mathjs'
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FullPaperPageHeader from '../Component/FullPaperPageHeader'
import { UserType, UserCourseList, UserInfo } from "../test"
import axios from "axios"
import BarChart from "../Component/BarChart"
import MixedChart from "../Component/MixedChart"
import QuizQuestion from "../Component/QuizQuestion"
import regression from 'regression';
import ReactApexChart from 'react-apexcharts'


const useStyles = makeStyles(theme => ({
    title: {
        color: '#B9B9B9',
        paddingTop: '15px',
        paddingBottom: '15px'
    },
    completeBox: {
        padding: '30px 0',
        [theme.breakpoints.up('md')]: {
            width: '70%',
        },
    },
    message: {
        paddingBottom: '25px',
    },
    title: {
        color: '#B9B9B9',
        paddingTop: '15px',
        paddingBottom: '15px'
    },


}));
let RegressionAnalysis = (props) => {
    const classes = useStyles();
    let [AvaCourse, setAvaCourse] = useState()
    let [Course, setCourse] = useState(props.match.params.course && props.match.params.course)
    let [success, setSuccess] = useState()
    let [alertMessage, setAlertMessage] = useState()
    let [openAlert, setOpenAlert] = useState()
    let [result, setResult] = useState()
    let [loading, setLoading] = useState()
    let [attendanceRecord, setAttendanceRecord] = useState()
    let [filteredData, setFilteredData] = useState()
    let [rating, setRating] = useState()


    const { userType } = useContext(UserType)
    const { courselist, courselistDispatch } = useContext(UserCourseList);
    const [quizNumber, setQuizNumber] = useState()
    const [regressionResult, setRegressionResult] = useState()
    const [ratAttend, setRatAttend]=useState()
    const[regressionRatAttend,setRegressionRatAttend]=useState()
    const[scoreRating,setScoreRating]=useState()
    const[regressionScoreRating,setRegressionScoreRating]=useState()

    
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
            window.location.href = process.env.REACT_APP_PRODUCTION_KEY +'/404'
        }
    }

    useEffect(() => {
        //fetch all quiz result
        let filered = []
        filered = courselist && Array.isArray(courselist) && courselist.filter(i => i.code === Course)
        if (Course && filered.length > 0) {
            setLoading(true)

            // teacher get attendance 
            axios.get(`/api/attendance/teacher/getAttendance/${Course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    console.log(response)
                    setAttendanceRecord(response.docs[0])
                } else {
                    setAttendanceRecord(false)
                    alert(response.error)
                }
            })
            //teacher get quiz result
            axios.get(`/api/quiz/result/all/${Course}`, { withCredentials: true }).then(response => response.data).then((response) => {
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

            //teacher get course rating
            axios.get(`/api/rating/result/${Course}`, { withCredentials: true }).then(response => response.data).then((response) => {
                if (response.redirectURL) {
                    //back to login
                    window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
                }
                else if (!response.error) {
                    setRating(response.docs)
                }
                else {
                    setRating(false)
                    setLoading(false)
                    alert(response.error)
                }
            })
        }
    }, [Course, courselist])

    //result vs attendance
    useEffect(() => {
        if (result && attendanceRecord) {
            let quizNum = result.length
            let totalquestion = 0
            for (let i = 0; i < quizNum; i++) {
                totalquestion += result[i].ans.length
            }
            let len = attendanceRecord.attendanceDate.length
            let studentarr = []
            for (let key in attendanceRecord.student) {
                let studentscore = 0
                let studattendrate = 0
                studattendrate = attendanceRecord.student[key].reduce((a, b) => parseInt(a) + parseInt(b), 0) / len * 100 // in percentage , the total class attended

                for (let i = 0; i < quizNum; i++) {
                    if (result[i].score && result[i].score[key]) {
                        studentscore += result[i].score[key].score
                    }
                }
                studentscore = studentscore / totalquestion * 100  // in precentage, the score that student scored in quiz
                studentarr.push([studentscore, studattendrate])
            }
            console.log(totalquestion)
            console.log(studentarr)
            setFilteredData(studentarr)
            let tmparr= calregression(studentarr)
            setRegressionResult(tmparr)
        }
    }, [result, attendanceRecord])


    let  calregression = (cleanData)=>{
        if (cleanData) {
            const result = regression.linear(cleanData);
            const gradient = result.equation[0];
            const yIntercept = result.equation[1];
            let arr = []
            let ftlen = cleanData.length
            for (let i = 0; i < ftlen; i++) {
                arr.push([cleanData[i][0], (yIntercept + gradient * cleanData[i][0] > 0) ? yIntercept + gradient * cleanData[i][0] : 0])
            }
            arr.sort(function (a, b) { return a - b });
            arr = arr.map(i => {
                return {
                    x: i[0],
                    y: i[1]
                }
            })
           return arr;
            console.log(arr)
            // return arr
        }
    }

    //result vs rating
    useEffect(()=>{
        if(result && rating && attendanceRecord){
            let quizNum = result.length
            let ratingnum = rating.length

            let totalquestion = 0
            for (let i = 0; i < quizNum; i++) {
                totalquestion += result[i].ans.length
            }



            let studentarr = []
            for (let key in attendanceRecord.student) {
                let studentrating = 0
                let studentscore = 0

                for (let i = 0; i < quizNum; i++) {
                    if (result[i].score && result[i].score[key]) {
                        studentscore += result[i].score[key].score
                    }
                }
                let studratingtaken = 0
                for (let i = 0; i < ratingnum; i++) {
                    if (rating[i].rating && rating[i].rating[key]) {
                        studentrating += rating[i].rating[key] /10
                        studratingtaken++
                    }
                }
                studentscore = studentscore / totalquestion * 100  // in precentage, the score that student scored in quiz
                studentrating = studentrating / studratingtaken * 100  // in precentage, the rating that student gave
                studentarr.push([studentscore, studentrating])
            }
            setScoreRating(studentarr)
            let tmpregresArr =calregression(studentarr)
            setRegressionScoreRating(tmpregresArr)
            console.log(studentarr)
        }
    },[result,rating, attendanceRecord])

    // rating data cleasning
    useEffect(()=>{
        if(rating && attendanceRecord){
            let ratingnum = rating.length


            let len = attendanceRecord.attendanceDate.length // number of attendace taken
            let studentarr = []
            for (let key in attendanceRecord.student) {
                let studentrating = 0
                let studattendrate = 0
                studattendrate = attendanceRecord.student[key].reduce((a, b) => parseInt(a) + parseInt(b), 0) / len * 100 // in percentage , the total class attended

                let studratingtaken = 0
                for (let i = 0; i < ratingnum; i++) {
                    if (rating[i].rating && rating[i].rating[key]) {
                        studentrating += rating[i].rating[key] /10
                        studratingtaken++
                    }
                }
                studentrating = studentrating / studratingtaken * 100  // in precentage, the score that student scored in quiz
                studentarr.push([studentrating, studattendrate])
            }
            setRatAttend(studentarr)
            let tmpregresArr =calregression(studentarr)
            setRegressionRatAttend(tmpregresArr)
            console.log(studentarr)
        }
    },[rating,attendanceRecord])


    let renderAnalysis = () => {
        return (
            <React.Fragment>

                <FullPaperPageHeader minheight={props.minheight && props.minheight} width={props.width}  title={`${props.match.params.course === undefined ? '' : Course} My Score Analysis`} 
                body1={'Select a Course to find out the Relationship between your Attendance, Score, and Ratings!'}>
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
                        {!Array.isArray(courselist) && courselist.length > 0 && <h2>You Have Not Enrolled In Any Course!</h2>}

                        {result && attendanceRecord && filteredData && regressionResult &&
                            <div id="chart">
                                <Typography variant="h4" className={classes.title}>
                                    Attendance Rate vs Quiz Score</Typography>
                                <ReactApexChart options={{
                                    chart: {

                                        height: 350,
                                        type: 'line',
                                    },
                                    fill: {
                                        type: 'solid',
                                    },
                                    markers: {
                                        size: [6, 0]
                                    },
                                    tooltip: {
                                        shared: false,
                                        intersect: true,
                                    },
                                    legend: {
                                        show: false
                                    },
                                    xaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Quiz Score (%)' 
                                        }
                                    },
                                    yaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Attendance Rate (%)'
                                        }
                                    }
                                }} series={[{
                                    name: 'Points',
                                    type: 'scatter',

                                    //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
                                    data: filteredData.map(i => {
                                        return { x: i[0], y: i[1] }
                                    })
                                }, {
                                    name: 'Line',
                                    type: 'line',
                                    data: regressionResult
                                }]} type="line" height={350} />
                            </div>}
                            {rating && attendanceRecord && ratAttend && regressionRatAttend &&
                            <div id="chart">
                                <Typography variant="h4" className={classes.title}>
                                    Attendance Rate vs Course Rating</Typography>
                                <ReactApexChart options={{
                                    chart: {

                                        height: 350,
                                        type: 'line',
                                    },
                                    fill: {
                                        type: 'solid',
                                    },
                                    markers: {
                                        size: [6, 0]
                                    },
                                    tooltip: {
                                        shared: false,
                                        intersect: true,
                                    },
                                    legend: {
                                        show: false
                                    },
                                    xaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Attendance Rate (%)'
                                        }
                                    },
                                    yaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Course Rating (%)'
                                        }
                                    }
                                }} series={[{
                                    name: 'Points',
                                    type: 'scatter',

                                    //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
                                    data: ratAttend.map(i => {
                                        return { x: i[0], y: i[1] }
                                    })
                                }, {
                                    name: 'Line',
                                    type: 'line',
                                    data: regressionRatAttend
                                }]} type="line" height={350} />
                            </div>}
                            {rating && attendanceRecord && ratAttend  && regressionScoreRating &&
                            <div >
                                <Typography variant="h4" className={classes.title}>
                                    Quiz Score vs Course Rating</Typography>
                                <ReactApexChart options={{
                                    chart: {

                                        height: 350,
                                        type: 'line',
                                    },
                                    fill: {
                                        type: 'solid',
                                    },
                                    markers: {
                                        size: [6, 0]
                                    },
                                    tooltip: {
                                        shared: false,
                                        intersect: true,
                                    },
                                    legend: {
                                        show: false
                                    },
                                    xaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Quiz Socre (%)'
                                        }
                                    },
                                    yaxis: {
                                        type: 'numeric',
                                        min: 0,
                                        max: 100,
                                        tickAmount: 12,
                                        labels: {
                                            formatter: function (val) {
                                                return parseFloat(val).toFixed(1)
                                            }
                                        },
                                        title: {
                                            text: 'Course Rating (%)'
                                        }
                                    }
                                }} series={[{
                                    name: 'Points',
                                    type: 'scatter',

                                    //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
                                    data: scoreRating.map(i => {
                                        return { x: i[0], y: i[1] }
                                    })
                                }, {
                                    name: 'Line',
                                    type: 'line',
                                    data: regressionScoreRating
                                }]} type="line" height={350} />
                            </div>}

                    </div>
                </FullPaperPageHeader>

            </React.Fragment>
        )
    }


    return (
        <React.Fragment>
            {checkifEnrolled() ? renderAnalysis() : <div>Loading...</div>}
        </React.Fragment>
    )
}

export default RegressionAnalysis
