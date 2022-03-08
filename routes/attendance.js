const express = require('express');
const router = express.Router();
const Attendance = require('../model/Attendance')
middleware = require("../middleware")

//get attendance by user's course (used by student)
router.get('/student/:courseCode',middleware.sessionChecker, async (req, res) => {
    Attendance.find({'courseCode':req.params.courseCode}, async function (err, docs) {
        if (docs.length) {
            let username = req.session.user
            let obj=[]
            for(let i=0;i<docs.length;i++){
                obj.push({"attendanceDate": docs[i].attendanceDate, 
            "courseCode": docs[i].courseCode,
            "rate": docs[i].student[username] || null
            })
            }
            res.json({docs:obj})
            
        } else {
            console.log('no course or wrong attendance code! ');
            res.json({ error: 'no course or wrong attendance code!  ' })
        }
    });
})

// used to take attendance by acceptinng the attendance code
router.post('/student',middleware.sessionChecker, async (req, res) => {
    Attendance.find({'courseCode':req.body.courseCode, 'attendanceCode':req.body.attendanceCode}, async function (err, docs) {
        if (docs.length) {
            let username = req.session.user
            if(!docs[0].student[username]){
                //first time 
                let pushObj ={}
                pushObj['student.'+username] = 1
                Attendance.findOneAndUpdate(
                    { courseCode: req.body.courseCode }, 
                    {$push: pushObj},
                    {new: true},
                   function (error, success) {
                         if (error) {
                            res.json(error);
                         } else {
                            res.json(success);
                         }
                     });
            }
           else if(docs[0].student[username].length === docs[0].attendanceDate.length -1 ){
                let pushObj ={}
                pushObj['student.'+username] = 1
                Attendance.findOneAndUpdate(
                    { courseCode: req.body.courseCode }, 
                    {$push: pushObj},
                    {new: true},
                   function (error, success) {
                         if (error) {
                            res.json(error);
                         } else {
                            res.json(success);
                         }
                     });
            }else{
                res.json({error:'Register Already!'});
            }
            
        } else {
            console.log('Wrong attendance code! ');
            res.json({ error: 'Wrong attendance code!  ' })
        }
    });
})


//get attendance by course (used by prof)
router.get('/teacher/getAttendance/:courseCode',middleware.sessionChecker, async (req, res) => {
    Attendance.find({'courseCode':req.params.courseCode}, async function (err, docs) {
        if (docs.length) {
            res.json({docs:docs})
            
        } else {
            console.log('no course or no attendance! ');
            res.json({ error: 'no course or no attendance!  ' })
        }
    });
})

// used to generate a random code for attendance taking
router.get('/teacher/getPin/:courseCode',middleware.sessionChecker, async (req, res) => {
    let randomcode = Math.floor(1000 + Math.random() * 9000);

     Attendance.find({'courseCode':req.params.courseCode}, async function (err, docs) {
        if (docs.length) {
            let pushObj ={}
            pushObj['attendanceCode'] = randomcode
                Attendance.findOneAndUpdate(
                    { courseCode: req.params.courseCode }, 
                    { $set:  {'attendanceCode' : randomcode }, $push: {'attendanceDate' : new Date()} },
                    {new: true},
                   function (error, success) {
                         if (error) {
                            res.json(error);
                         } else {
                            res.json({docs:success.attendanceCode});
                         }
                     });
            
      
        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });
})

// used to check if random code is already generated 
router.get('/teacher/checkPin/:courseCode',middleware.sessionChecker, async (req, res) => {

     Attendance.find({'courseCode':req.params.courseCode}, async function (err, docs) {
        if (docs.length) {
            if(docs[0].attendanceCode.length >0 ){
                res.json({docs:docs[0].attendanceCode})
            }
            else
            res.json({ error: 'no code exist!' })
      
        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });
})

//used to close attendance taking 
router.get('/teacher/closeAttendance/:courseCode',middleware.sessionChecker, async (req, res) => {

    Attendance.find({'courseCode':req.params.courseCode}, async function (err, docs) {
        if (docs.length) {
            let dateLength = docs[0].attendanceDate.length
            for(const property in docs[0].student){
                let len = docs[0].student[property].length
                if(len < dateLength){
                    let pushObj ={}
                    pushObj['student.'+property] = 0
                    Attendance.findOneAndUpdate(
                        { 'courseCode':req.params.courseCode }, 
                        { $push: pushObj },
                        function (error, success) {
                              if (error) {
                                //  res.json(error);
                              } else {
                                //  res.json(success);\
                                console.log("Done Update Student Attendance")
                              }
                          });
                }
            }
                Attendance.findOneAndUpdate(
                    { courseCode: req.params.courseCode }, 
                    { $set:  {'attendanceCode' : '' } },
                    {new: true},
                   function (error, success) {
                         if (error) {
                            res.json(error);
                         } else {
                            res.json(success);
                         }
                     });
            
      
        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });
})


module.exports = router