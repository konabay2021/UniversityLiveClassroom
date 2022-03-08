const Course = require('../model/Course')
const CreateAC = require('../model/CreateAC')
const Attendance = require('../model/Attendance')
const Forum = require('../model/ForumPage')
const ForumComment = require('../model/ForumComment')
const Quiz = require('../model/Quiz')


const express = require('express');
const router = express.Router();
middleware = require("../middleware")

router.post('/', middleware.sessionChecker, async (req, res) => {
    let student = req.body.student
    let len = student.length
    forum = new Forum({
        code: req.body.code,
        topic:[]
    })
    forumComment= ForumComment({
        code: req.body.code,
        comment: {}
    }) 
    quiz= Quiz({
        courseCode: req.body.code,
        quiz: []
    }) 
    course = new Course({
        code: req.body.code,
        name: req.body.title,
        prof: req.body.lecturer,
        username: req.body.username,
        department: req.body.department,
    })

    let obj = {}
    for (let i = 0; i < len; i++) {
        obj[student[i]] = []
    }

    attendance = new Attendance({
        courseCode: req.body.code,
        attendanceCode: '',
        attendanceDate: [],
        student: obj
    })
    // + attendance
    // try {
    const savedforum= await forum.save();
    const savedforumComment= await forumComment.save();
    const savedquiz= await quiz.save();



    const savedcourse = await course.save();
    const savedattendance = await attendance.save()
        //update student course list in student collection
        for (let i = 0; i < len; i++) {
        CreateAC.findOneAndUpdate(
            { 'username': req.body.student[i] },
            { $push: { course: req.body.code } },
            { new: true, },
            function (error, success) {
            });
    }
    CreateAC.findOneAndUpdate(
        { username: req.body.username },
        { $push: { course: req.body.code } },
        { new: true, },
        function (error, success) {
            res.json(success)
        });
    // res.json(savedcourse)
    // } catch (err) {
    //     res.json({ error: err })
    // }
})


module.exports = router