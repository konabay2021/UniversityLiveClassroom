const mongoose = require('mongoose')

const StudentRating = mongoose.Schema({
    username: {
        type: String
    },
    ratingScore: {
        type: Number
    }
})
const RatingDate = mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    studentRating:{
        type: Object
    }
})


const RatingSchema = mongoose.Schema({
    code: {
        type: String
    },
    mode:{
        type: Number,
        default: 0
    },
    date:{
        type: Date,
        default: Date.now
    },
    rating: {
        type: Object
    }
})

module.exports = mongoose.model('courseratings', RatingSchema)