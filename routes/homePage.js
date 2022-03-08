const express = require('express');
const router = express.Router();
const Post = require('../model/Course')
const CreateAC = require('../model/CreateAC')

middleware = require("../middleware")

//get user course list
router.post('/home', middleware.sessionChecker, async (req, res) => {
    let userCourse = []
    console.log(req.session.usertype)
    CreateAC.find({ username: req.session.user }, function (err, docs) {
        if (docs.length) {

            Post.find({ code: { $in: docs[0].course} }, function (err, docs) {
                if (docs.length) {
                    console.log(docs)
                    res.json({docs : docs, type: req.session.usertype})
                } else {
                    console.log('no  course yet! ');
                    res.json({ error: 'no course yet! ', type: req.session.usertype })
                }
            });
        }

    });
    
})

//get all course //used by in add Course Page
router.get('/home',middleware.sessionChecker, async (req, res) => {
    Post.find({}, function (err, docs) {
        if (docs.length) {
            console.log(docs)
            let tmp = []
            for (let i = 0; i < docs.length; i++) {
                tmp.push({ 'code': docs[i].code, 'name': docs[i].name, 'username': docs[i].username, 'prof': docs[i].prof })
            }
            res.json({docs:tmp})
        } else {
            console.log('no  course yet! ');
            res.json({ error: 'no course yet! ' })
        }
    });


})


module.exports = router