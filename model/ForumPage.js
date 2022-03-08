const mongoose = require('mongoose')

const Topic = mongoose.Schema({
    topic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    page: {
        type: String,
        default: "1"
    },
    lauzhu: {
        type: String,
    },
    context:{
        type:String
    }
})

const ForumSchema = mongoose.Schema({
    id: {
        type: String
    },
    code: {
        type: String
    },
    topic: {
        type: [Topic]
    }
})

module.exports = mongoose.model('forums', ForumSchema)