import React, { useState, useReducer, useEffect, useContext, createContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from "./Container/LoginPage"
import SignUp from "./Container/Signup"
import ForgetPW from "./Container/forgetPW"
import ForumHome from "./Container/ForumHome"
import CoursePage from "./Container/CoursePage"
import Attendance from "./Container/Attendance"
import Header from "./Component/Header"
import Quiz from "./Container/Quiz"
import QuizHistory from "./Container/QuizHistory"
import Home from "./Container/home"
import RegressionAnalysis from "./Container/RegressionAnalysis"
import NotificationPage from "./Container/NotificationPage"
import AddCourse from "./Container/AddCourse"
import UserProfile from "./Container/userProfile"
import QuizRecord from "./Container/QuizRecord"
import StartQuiz from "./Container/StartQuiz"
import ProfessorQuiz from "./Container/ProfessorQuiz"
import ProfessorStartQuiz from "./Container/ProfessorStartQuiz"
import CreateQuiz from "./Container/CreateQuiz"
import CourseRating from "./Component/rating"
import AdminInput from './Container/adminInput'
import Errorpage from './Container/Errorpage'
import Footer from './Component/Footer'
import CourseList from "./Container/CourseList"
import Welcome from './Container/welcome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './history';
import './App.css';
import UserCourseListReducer from "./Reducer/UserCourseListReducer";
import UserInfoReducer from "./Reducer/UserInfoReducer";
import UserTypeReducer from "./Reducer/UserTypeReducer";
import axios from "axios"

import { UserCourseList, UserInfo, UserType } from "./test"


function App() {

  const [courselist, courselistDispatch] = useReducer(UserCourseListReducer, []);
  const [userType, userTypeDispatch] = useReducer(UserTypeReducer, '');

  //get the course that user enrolled
  useEffect(() => {
    // get user courselist and type
    if (!checkifURLContainsString()) {
      axios.post('/api/home', {}, { withCredentials: true }).then(response => response.data).then((response) => {
        console.log(response)
        if (response.redirectURL) {
          //back to login
          window.location.href = process.env.REACT_APP_PRODUCTION_KEY + response.redirectURL
        }
        else if (!response.error) {
          courselistDispatch({ type: 'ADD_COURSE', payload: response.docs })
          userTypeDispatch({ type: 'ADD_TYPE', payload: response.type })
        }
        else {
          courselistDispatch({ type: 'ADD_COURSE', payload: response.error })
          userTypeDispatch({ type: 'ADD_TYPE', payload: response.type })

        }
      })
    }
  }, [])

  let checkifURLContainsString = () => {
    console.log(window.location.href)
    if (( window.location.href === process.env.REACT_APP_PRODUCTION_KEY + "/"  || window.location.href.indexOf("login") > -1 || window.location.href.indexOf("signup") > -1 || window.location.href.indexOf("welcome") > -1))
      return true
 

    return false
  }
 
  return (
    <Router history={history}>
      <div className="App">

        <UserCourseList.Provider value={{
          courselist: courselist,
          courselistDispatch
        }}>
          <UserType.Provider value={{
            userType: userType,
            userTypeDispatch
          }}>
            {!checkifURLContainsString() && window.location.href !== process.env.REACT_APP_PRODUCTION_KEY +"/" && <Header />}
            <Switch>
              <Route path="/Attendance" render={(props) =>
                <Attendance {...props} />
              }
              />
              <Route exact path="/login" render={(props) =>
                <LoginPage {...props} />
              }
              />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/forgetpw" component={ForgetPW} />
              <Route path="/ForumHome" component={ForumHome} />
              <Route path="/NotificationPage" component={NotificationPage} />
              <Route path="/AddCourse" component={AddCourse} />
              <Route path='/Quiz/history/:course' component={QuizHistory} />
              <Route path='/Quiz/history/' component={QuizHistory} />
              <Route path="/Quiz" component={Quiz} />
              <Route path="/QuizRecord" component={QuizRecord} />
              <Route path="/StartQuiz" component={StartQuiz} />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/ProfessorQuiz" component={ProfessorQuiz} />
              <Route path="/ProfessorStartQuiz" component={ProfessorStartQuiz} />
              <Route path="/CreateQuiz" component={CreateQuiz} />
              <Route path="/RegressionAnalysis" component={RegressionAnalysis} />
              <Route path="/rating" component={CourseRating} />
              <Route path="/adminInput" component={AdminInput} />
              <Route path="/CourseList" component={CourseList} />
              <Route path="/404" component={Errorpage} />
              <Route path="/home/:id" component={CoursePage} />
              <Route exact path="/home" component={Home} />
         
              {/* This Part is for Welcome Page */}
              <Route path="/welcome" component={Welcome} />
              <Route path="/" exact component={Welcome} />
              <Route path="/:id" component={Errorpage}>
                <div>ERROR </div>
              </Route>
            </Switch>
          </UserType.Provider>
        </UserCourseList.Provider>

        {/* </React.Fragment> */}
        <Footer />

      </div>
    </Router>

  );
}
export default App;

