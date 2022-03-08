const express = require('express');
const router = express.Router();
const Quiz = require('../model/Quiz')
middleware = require("../middleware")

// get quiz question
router.post('/student',middleware.sessionChecker, async (req, res) => {
    Quiz.find({ 'courseCode': req.body.courseCode }, async function (err, docs) {
        if (docs.length) {
            let len = docs[0].quiz.length
            if (docs[0].quiz[len - 1].score && docs[0].quiz[len - 1].score[req.session.user]) {
                res.json({ error: 'you have already submitted!' })
            } else if (docs[0].mode === '0') {
                res.json({ error: 'Professor has not started  a new quiz!' })
            } else {
                res.json({ docs: docs[0].quiz[len - 1].question })
            }
        } else {
            console.log('no quiz yet! ');
            res.json({ error: 'no quiz yet!  ' })
        }
    })
})

//set quiz to start or stop
router.get('/start/:courseCode/:mode',middleware.sessionChecker, async (req, res) => {
    let message = req.params.mode === '1' ? 'Quiz has Started!' : 'Quiz has Ended!'
    Quiz.findOneAndUpdate(
        { 'courseCode': req.params.courseCode },
        { $set: { mode: req.params.mode } },
        { new: true, },
        function (error, success) {
            if (error) {
                res.json(error);
            } else {
                res.json({ message: message });
            }
        });

})

//Used by student. used to submit score to server
router.post('/student/submit',middleware.sessionChecker, async (req, res) => {
    Quiz.find({ 'courseCode': req.body.courseCode }, function (err, docs) {
        if (docs.length) {
            let len = docs[0].quiz.length
            let id = docs[0].quiz[len - 1]._id
            let ans = req.body.ans
            let username = req.session.user
            let NumberOfQ = docs[0].quiz[len - 1].ans.length
            let score = 0

            if (docs[0].quiz[len - 1].score && docs[0].quiz[len - 1].score[username]) {
                res.json({ error: 'you have already submitted/Professor has not started  a new quiz!' })
            }
            else {
                for (let i = 0; i < NumberOfQ; i++) {
                    if (ans[i] === docs[0].quiz[len - 1].ans[i])
                        score++
                }
                let set = `quiz.$[el].score.${username}`

                Quiz.findOneAndUpdate(
                    { 'courseCode': req.body.courseCode },
                    //  {$set:   pushObj},
                    { $set: { [set]: { 'ans': ans, 'score': score } } },
                    {
                        arrayFilters: [{ "el._id": id }],
                        new: true
                    },
                    function (error, success) {
                        if (error) {
                            res.json(error);
                        } else {
                            data = success.quiz[len - 1].score[username]
                            res.json({ docs: data });
                        }
                    });
            }


        } else {
            console.log('no quiz yet ! ');
            res.json({ error: 'no quiz yet!  ' })
        }
    });
})

//get quiz result by course
router.get('/result/:courseCode', middleware.sessionChecker,async (req, res) => {
    Quiz.find({ 'courseCode': req.params.courseCode }, async function (err, docs) {
        if (docs.length) {
            if (docs[0].quiz) {
                // render general quiz result by course (no user details)
                let arr = []
                let avScore = [];
                let quizlen = docs[0].quiz.length
                let usersocre = []
                let ans = []
                let question = []
                for (let i = 0; i < quizlen; i++) {
                    let qlen = docs[0].quiz[i].ans.length
                    let studentNum = docs[0].quiz[i].score ? Object.keys(docs[0].quiz[i].score).length : 0
                    avScore = []
                    ans.push(docs[0].quiz[i].ans)
                    question.push(docs[0].quiz[i].question)
                    for (key in docs[0].quiz[i].score) {
                        avScore.push(parseFloat(docs[0].quiz[i].score[key].score))

                        if (key === req.session.user) {
                            usersocre.push(docs[0].quiz[i].score[key])
                        }
                    }
                    if (studentNum !== 0) {
                        arr.push(avScore)
                    }
                }
                res.json({ docs: { 'socredist': arr, 'userscore': usersocre, 'question': question, 'ans': ans } })
                // res.json(docs[0].quiz)

            } else {
                res.json({ error: 'no quiz yet!  ' })
            }

        } else {
            console.log('no quiz yet! ');
            res.json({ error: 'no quiz yet!  ' })
        }
    })
})

// get all quiz data course (to analysis)
router.get('/result/all/:courseCode', middleware.sessionChecker,async (req, res) => {
    Quiz.find({ 'courseCode': req.params.courseCode }, async function (err, docs) {
        if (docs.length) {
            if (docs[0].quiz) {
                // render quiz result by course (with user details)
                res.json({docs : docs[0].quiz})

            } else {
                res.json({ error: 'no quiz yet!  ' })
            }

        } else {
            console.log('no quiz yet! ');
            res.json({ error: 'no quiz yet!  ' })
        }
    })
})

// Used by teacher. used to uplaod quiz question and answer. 
router.post('/teacher' , middleware.sessionChecker, async (req, res) => {
    let question = req.body.question // type: array of object
    let ans = req.body.ans //type: array
    Quiz.find({ 'courseCode': req.body.courseCode }, async function (err, docs) {
        if (docs.length) {
            let pushObj = {
                question: question,
                ans: ans,
                number: docs[0].quiz.length + 1
            }
            Quiz.findOneAndUpdate(
                { courseCode: req.body.courseCode },
                { $push: { quiz: pushObj } },
                { new: true },
                function (error, success) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json({ docs: success });
                    }
                });
        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });


})


module.exports = router