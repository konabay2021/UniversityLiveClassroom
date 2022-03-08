const mongoose = require ('mongoose')


const ForumComments = mongoose.Schema({
    code: {
        type: String
    },
    comment:{
        type: Object
    }

})

module.exports = mongoose.model('forumcomments', ForumComments)