const express = require('express');
const router = express.Router();
const Post = require('../model/CreateAC')
const Course = require('../model/Course')
middleware = require("../middleware")

//edit user details (except username)
router.post('/edit', middleware.sessionChecker, async (req, res) => {
    let username = req.session.user //type: string
    Post.findOneAndUpdate(
        { username: username },
        { $set: req.body },
        { new: true },
        function (error, success) {
            if (error) {
                res.json(error);
            } else {
                res.json({ docs: success });
            }
        });

});

//edit user pw
router.post('/editpw', middleware.sessionChecker, async (req, res) => {
    let username = req.session.user //type: string
    console.log(req.body)
    let obj = {}
    obj[req.body.type] = req.body.value
    Post.find({ username: username, pw: req.body.oldpw }, function (err, docs) {
        if (docs.length) {
            Post.findOneAndUpdate(
                { username: username },
                { $set: { 'pw': req.body.newpw } },
                { new: true },
                function (error, success) {
                    if (error) {
                        res.json({ error: 'unknown error occured!' });
                    } else {
                        res.json({ docs: 'successfully changed passord!' });
                    }
                });

        } else {
            console.log('no user: ');
            res.json({ error: 'wrong pw!' })
        }
    });



});

router.get('/info', middleware.sessionChecker, async (req, res) => {
    Post.find({ username: req.session.user }, function (err, docs) {
        if (docs.length) {
            docs[0].pw = undefined;
            res.json({ docs: docs[0] })
        } else {
            console.log('no user: ');
            res.json({ error: 'no user' })
        }
    });
})

//get all types of  notificaiton 
router.get('/getNotification', middleware.sessionChecker, async (req, res) => {
    let username = req.session.user;
    Post.find({ 'username': username }, async function (err, docs) {
        var courseNotice = [] //array
        if (docs.length) {
            let tmp = {
                'sitNotice': [],
                'forumNotice': [],
                'courseNotice': []
            }
            tmp.sitNotice = docs[0].sitNotice
            tmp.forumNotice = docs[0].forumNotice
            Course.find({ 'code': docs[0].course }, async function (err, docs) {
                if (docs.length) {
                    let len = docs.length
                    for(let i=0;i<len;i++){
                        tmp.courseNotice = [...tmp.courseNotice, ...docs[i].updates]

                    }
                    console.log(tmp.courseNotice)
                    res.json({ docs: tmp });
                }
            })

        }
        else
            res.json({ error: 'no updates' })
    })
})

//delete notification 
router.delete('/deleteNotification/:id/:noticeType', middleware.sessionChecker, (req, res) => {
    let username = req.session.user
    let id = req.params.id
    let noticeType = req.params.noticeType
    Post.updateOne({ username: username }, { $pull: { 'forumNotice': { _id: id } } }, { safe: true, multi: true }, function (err, obj) {
        if (obj)
            res.json({ 'docs': 'noti deleted' })
        else
            res.json({ 'error': 'server error, failed to delete post' })
    });


})

//request to enroll for a course 
router.post('/requestAddCourse', middleware.sessionChecker, async (req, res) => {
    let studentUsername = req.session.user //type: string
    let course = req.body.code
    let message = req.body.message

    Course.find({ 'code': course }, async function (err, docs) {
        if (docs.length) {
            let prof = docs[0].username

            Post.find({ username: studentUsername }, async function (err, docs) {
                if (docs.length) {
                    let filtered = docs[0].pendingCourse.filter(i => {
                        return i === course
                    })
                    if (filtered.length !== 0) {
                        console.log('you have already requested! ');
                        res.json({ error: 'You have already requested! ' })
                    }
                    else {
                        filtered = docs[0].course.filter(i => {
                            return i === course
                        })
                        if (filtered.length === 0) {
                            // update prof ac
                            Post.findOneAndUpdate(
                                { username: prof },
                                {
                                    $push: {
                                        sitNotice: {
                                            type: 'Sit in Course Request',
                                            course: course,
                                            studentUsername: studentUsername,
                                            message: message
                                        }
                                    }
                                },
                                { new: true },
                                function (error, success) {
                                    // if (error) {
                                    //     res.json(error);
                                    // } else {
                                    //     res.json(success);
                                    // }
                                });

                            // update student ac
                            Post.findOneAndUpdate(
                                { username: studentUsername },
                                {
                                    $push: {
                                        pendingCourse: course,
                                        sitNotice: {
                                            type: 'Sit in Course Request',
                                            course: course,
                                            studentUsername: studentUsername,
                                            message: message,
                                            status: 'Pending'
                                        }
                                    }
                                },
                                { new: true },
                                function (error, success) {
                                    if (error) {
                                        res.json(error);
                                    } else {
                                        res.json({ success: 'Success!' });
                                    }
                                });
                        } else {
                            console.log('you have already enrolled! ');
                            res.json({ error: 'You have already enrolled! ' })
                        }


                    }


                } else {
                    console.log('no such studnet ');
                    res.json({ error: 'no such student !  ' })
                }
            })


        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });
});

//add enrolled course for user (has to be done by teacher)
router.post('/addEnrolledCourse', middleware.sessionChecker, async (req, res) => {
    let username = req.body.username //type: string //studnet
    let course = req.body.course
    let type = req.body.type
    let id = req.body.id
    let profusername = req.session.user
    console.log(username, course, type, id, profusername)
    Post.find({ 'username': username }, async function (err, docs) {
        if (docs.length) {
            // + student to course 
            Post.findOneAndUpdate(
                { username: username },
                {
                    $push: {
                        course: course,
                        sitNotice: {
                            type: 'Sit in Course Request',
                            course: course,
                            studentUsername: username,
                            message: type === 'allow' ? 'You can view the course materials now!' : 'Your request was declined.',
                            status: type === 'allow' ? 'Success' : 'Rejected'
                        }
                    },
                    $pull: {
                        pendingCourse: course,
                    }
                },
                { new: true }, function (err,obj){

                });
            if (type === 'allow') {
                Post.findOneAndUpdate(
                    { username: username },
                    {
                        $push: {
                            course: course,
                        }
                    },
                    { new: true }, function(err,obj){

                    })
            }

            //remove noti for prof
            Post.updateOne({ username: profusername }, { $pull: { 'sitNotice': { _id: id } } }, { safe: true, multi: true }, function (err, obj) {
                if (obj)
                    res.json({ 'success': 'student added' })
                else
                    res.json({ 'error': 'server error, failed to add student' })
            });

        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });
});

module.exports = router