const express = require('express');
const router = express.Router();
const Post = require('../model/CreateAC')


router.post('/', async (req, res) => {
    const post = new Post({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        pw: req.body.pw,
    })
    Post.find({ $or:[ {'email':req.body.email}, {'username':req.body.username}]}, async function (err, docs) {
        if (!docs.length) {
            try {
                const savedPost = await post.save();
                res.json(savedPost)
            } catch (err) {
                res.json({ message: err })
            }
        } else {
            console.log('user exists: ');
            res.json({ message: 'user exists: ' })
        }
    });


})

module.exports = router