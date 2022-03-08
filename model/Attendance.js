const mongoose = require ('mongoose')

// const Student= mongoose.Schema({

// })

const AttendanceSchema = mongoose.Schema({
    courseCode:{
        type:String
    },
    attendanceCode:{
        type: String
    },
    attendanceDate:{
        type: Array
    },
    closeAttendance:{
        type: Boolean
    },
    student:{
        // type: [Student]
        type: Object
    }
})

module.exports = mongoose.model('attendances', AttendanceSchema)