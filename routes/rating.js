const express = require('express');
const router = express.Router();
const Rating = require('../model/Rating')
const Course = require('../model/Course')
middleware = require("../middleware")

// start the rating
router.get('/rating/declare/:code', middleware.sessionChecker,async (req, res) => {
    const rating = new Rating({
        code: req.params.code,
        mode: 1,
        rating: {},
    })
    try {
        const createRating = await rating.save();
        // res.json(createRating)

        //add course update notificaiton 
        let updates={
            course: req.params.code,
            type: 'Course Evaluation Updates',
            message: req.params.code + ' course evaluation is available!'
          }
        Course.findOneAndUpdate(
            { 'code': req.params.code },
            { $push : {updates: updates}   },
            {   new: true , },
            function (error, success) {
              if (error) {
                res.json(error);
              } else {
                res.json({docs:createRating});
              }
            });
    } catch (err) {
        res.json({ error: err })
    }
})

// check if user (student) can do the rating 
router.get('/rating/checkRatingMode/:code', middleware.sessionChecker,async (req, res) => {
    Rating.find({ code: req.params.code, mode: 1 }, async function (err, docs) {
        if (docs.length) {
            if (docs[0].mode) {
                res.json({ mode: 'Available', id: docs[0]._id })
            }
            else {
                res.json({ mode: 'Not Available' })
            }
        } else {
            console.log('cannot find course! ');
            res.json({ error: 'cannot find course! ' })
        }
    });
})

// close the rating 
router.get('/rating/close/:id', middleware.sessionChecker,async (req, res) => {
    Rating.find({ _id: req.params.id }, async function (err, docs) {
        if (docs.length) {
            Rating.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { mode: 0 } },
                { new: true }, function (error, success) {
                    if (error) {
                        console.log("error")
                        res.json({ error: error })
                    } else {
                        console.log("success")
                        res.json(success)
                    }
                });
        } else {
            console.log('cannot find course!');
            res.json({ error: 'cannot find course!' })
        }
    });
})

// To add a rating
router.post('/rating/post', middleware.sessionChecker,async (req, res) => {
    let pushobj = {}
    console.log(req.body)
    pushobj['rating.' + req.session.user] = req.body.ratingScore

    Rating.findOneAndUpdate({ '_id': req.body.id },
        { $set:  pushobj },
        { new: true }, function (err, doc) {
            if (err) return res.send(500, { error: err });
            return res.json('Success!');
        });

})

// get all rating by course
router.get('/rating/result/:code', middleware.sessionChecker,async (req, res) => {
    Rating.find({ code: req.params.code }, async function (err, docs) {
        if (docs.length) {
            
            res.json({docs: docs })
        } else {
            console.log('cannot find course!');
            res.json({ error: 'cannot find course!' })
        }
    });
})

module.exports = router