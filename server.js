
var express = require('express');
var app = express();
const mongoose = require("mongoose")
require('dotenv/config')
var cors = require('cors');
var path = require('path');
var port = process.env.PORT || 8080
// app.use(cors({credentials: true, origin: process.env.REACT_APP_PRODUCTION_KEY}));
var session = require("express-session");
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// app.use(middleware.sessionChecker);

var multer = require('multer')
//import routes
const createAC = require('./routes/createAC')
const loginAC = require('./routes/loginAC')
const homePage = require('./routes/homePage')
const forumPage = require('./routes/forumPage')
const attendance = require('./routes/attendance')
const quiz = require('./routes/quiz')
const forumComments = require('./routes/forumComments')
const user = require('./routes/user')
const uploadPropic = require('./routes/uploadPropic')
const rating = require('./routes/rating')
const addUpdate = require('./routes/addUpdate')
const logout = require('./routes/logout')
const admin = require('./routes/admin')



app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires: 600000,
    httpOnly: false,
    secure: false,
  }
}));




// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie('user_sid');
//   }
//   next();
// });

// sessionChecker1 = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//     console.log(req.session.user)
//     console.log('has cookirse!')
//    next();

//   } else {
//    console.log("no cookies")
//    res.redirect('/alogin');
// };
// }


// app.get('/ahome',sessionChecker1, (req, res) => {
//  console.log("hello")
//  res.json('hello')
// });

// app.route('/alogin')
//   .get(( req, res) => {
//     // var username = req.body.username
//     // var password = req.body.password;
//     req.session.user ='test'
//     res.redirect('/ahome')
//   }); 

app.use('/api/createAC', createAC)
app.use('/api/login', loginAC)
app.use('/api/', homePage)
app.use('/api/', addUpdate)
app.use('/api/forum', forumPage)
app.use('/api/attendance', attendance)
app.use('/api/quiz', quiz)
app.use("/api/forumComments", forumComments)
app.use("/api/user", user)
app.use("/api/", rating)
app.use('/api/',uploadPropic)
app.use('/api/admin',admin)
app.use('/api/logout',logout)


console.log(process.env.NODE_ENV)


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('frontend/build'));
// }
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')); // relative path
});
app.listen(port, function () {
  console.log('Example app listening on port' + port +"!");
});

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("connected to DB!")
})


