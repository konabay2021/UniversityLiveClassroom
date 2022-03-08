module.exports = {
    sessionChecker: function (req, res, next) {
        console.log("1")
        if (req.session.user && req.cookies.user_sid) {
            console.log("has cookies, contine")
            next();

        } else {
            console.log("no cookies , redirect to welcome page (intro)")
            res.json(  { 'redirectURL': '/welcome'})

        }
    },
    loginChecker: function (req, res, next) {
        console.log("2")
        console.log(req.cookies.user_sid)
        if (req.session.user && req.cookies.user_sid) {
            //have cookies
            console.log("has cookies, redirect to home ")
            res.json(  { 'redirectURL': '/home'})

        } else {
            console.log("no cookies, continue to login ")
            next();
        }
    },
}

  //idea: 2 types: 1for login, 2for nromal