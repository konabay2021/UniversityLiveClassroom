const mongoose = require ('mongoose')

const QuizeQuestionSchema = mongoose.Schema({
    question:{
        type: Array
    },
    ans:{
        type:Array
    },
    number:{
        type: String
    },
    score:{
        type: Object
    }
})

const QuizeSchema = mongoose.Schema({
    courseCode:{
        type:String
    },
    mode:{
        type:String
    },
    quiz:{
        type: [QuizeQuestionSchema]
    },
})

module.exports = mongoose.model('quizs', QuizeSchema)