const express = require('express');
const router = express.Router();
const ForumComment = require('../model/ForumComment')
const Post = require('../model/CreateAC')
middleware = require("../middleware")

// get the forum topic's comments
router.post('/',middleware.sessionChecker, async (req, res) => {
    
    let id = req.body.id 
    let code = req.body.code 
    let obj ={
        'code':code
    }
    obj['comment.'+id]  = {"$exists":true}

    ForumComment.find(obj, function (err, docs) {
        if (docs.length) {
            console.log(docs[0])
            
            res.json( {docs:  docs[0].comment[req.body.id] })
        } else {
            console.log('no such commnet yet! ');
            res.json({ error: 'no such commnet yet! ' })
        }
    });

})


// To add a comment to the forum topic to the server
router.post('/addComment', middleware.sessionChecker,async (req, res) => {
    let code = req.body.code 
    let id = req.body.id 
    let text = req.body.text 
    let user = req.session.user 
    let lauzhu = req.body.lauzhu
    let obj ={
        'code':code
    }
    console.log(user)
    console.log(lauzhu)
    // obj['comment.'+id]  = {"$exists":true}
    ForumComment.find(obj, async function (err, docs) {
        if (docs.length) {
            let pushObj={
               
            }
            pushObj['comment.'+id]  = {
                'text': text,
                'date': new Date(),
                'user':user
            }
            // update the topic creater's ac notificaiton
            if(user !== lauzhu){
                Post.findOneAndUpdate(
                    { username: lauzhu },
                    {
                        $push: {
                            forumNotice: {
                                type: 'New Reply',
                                course: code,
                                studentUsername: user,
                                message: text,
                                link: id
                            }
                        }
                    },
                    { new: true }, function (error, success) {
                        if (error) {
                           console.log("error")
                        } else {
                            console.log("success")
                            // res.json(success)
                        }
                    });

            }
           
            //update the comment array 
            ForumComment.findOneAndUpdate(
                { code: req.body.code }, 
                {$push:  pushObj },
                {new: true},
               function (error, success) {
                     if (error) {
                        res.json( {error: 'unknown error'});
                     } else {
                    //    let length= success.topic.length
                       res.json(success.comment[req.body.id])
                        // res.json(success.topic[length-1]);
                     }
                 });
        } else {
            console.log('no course  code! ');
            res.json({ error: 'no course  code!  ' })
        }
    });


})

module.exports = router