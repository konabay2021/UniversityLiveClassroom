
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.json(  { 'redirectURL': '/login'})
    } else {
        console.log('logout error occured')
        res.json(  { 'redirectURL': '/login'})

    }
});
module.exports = router
