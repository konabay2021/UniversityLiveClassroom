const mongoose = require ('mongoose')

const updates =  mongoose.Schema({
    type:{
        type:String
    },
    course:{
        type:String
    },
    message:{
        type:String
    },
    date:{
        type: Date,
        default: Date.now
    }
})
const LecTut=mongoose.Schema({
    name:{
        type:String
    },
    link:{
        type:String
    }
})
const Asg=mongoose.Schema({
    name:{
        type:String
    },
    deadline:{
        type:String
    },
    link:{
        type:String
    }
})
const materials=mongoose.Schema({
    LectureNotes:{
        type:[LecTut]
    },
    Assignment:{
        type:[Asg]
    },
    Tutorial:{
        type:[LecTut]
    }
})
const CourseSchema = mongoose.Schema({
    id:{
        type:String
    },
    code:{
        type:String
    },
    name:{
        type: String
    },
    prof:{
        type: String
    },
    username:{
        type: String
    },
    department:{
        type: String
    },
    updates:{
        type: [updates]
    },
    materials:{
        type : {materials}
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('courses', CourseSchema)