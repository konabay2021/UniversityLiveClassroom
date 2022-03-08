const Course = require('../model/Course')
const express = require('express');
const router = express.Router();
middleware = require("../middleware")


router.post('/updates/postUpdates',middleware.sessionChecker, async (req, res) => {
    let updates = {}
    updates = {
        course: req.body.course,
        type: req.body.messagetype,
        message: req.body.message
    }
    Course.findOneAndUpdate(
        { 'code': req.body.course },
        { $push: { updates: updates } },
        { new: true, },
        function (error, success) {
            if (error) {
                res.json({error: 'error occured'});
            } else {
                res.json({docs:success});
            }
        });
})


module.exports = router
