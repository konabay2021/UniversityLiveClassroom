const express = require('express');
const router = express.Router();
const Post = require('../model/CreateAC')
middleware = require("../middleware")

router.post('/',middleware.loginChecker, async (req, res) => {
    const post = new Post({
        username: req.body.username,
        pw: req.body.pw,
    })
    Post.find({ username: req.body.username, pw: req.body.pw }, function (err, docs) {
        if (docs.length) {
            console.log('login success')
            docs[0].pw = undefined;
            req.session.user =req.body.username
            req.session.usertype = docs[0].type
            res.json(  { 'redirectURL': '/home'})

        } else {
            console.log('no user: ');

            res.json({ error: 'no user' })
        }
    });
})









module.exports = router