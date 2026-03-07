const mongoose = require("mongoose")

const newReqestSchema = new mongoose.Schema({
    RegisterNumber : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    year :{
        type : Number,
        required : true
    },
    Department : {
        type : String,
        required : true
    },
    PhoneNumber :{
        type : Number,
        required : true
    },
    ParentNumber : {
        type : Number,
        required : true
    },
    Destination : {
        type : String,
        required : true
    },
    Gender : {
        type : String,
        required : true
    },
    RoomNo : {
        type : String,
        required : true
    },
    Purpose : {
        type : String,
        required : true
    },
    OutDateTime : {
        type : String,
        required : true
    },
    InDateTime :{
        type : String,
        required : true
    },
    studentOutTime : {
        type : String,
    },
    studentInTime : {
        type : String
    },
    status : {
        type : String,
        required : true,
        default  : 1
    },
    delete :{
        type : Boolean,
        default : false
    },
    User : {
        type : mongoose.Types.ObjectId,
        ref : "Students",
        required : true
    },
    warden : {
        type : String,
    }, 
    security : {
        type : String,
    }

},{timestamps : true,})

newReqestSchema.index({ createdAt: -1 });
newReqestSchema.index({ year: 1, Department: 1 });
newReqestSchema.index({ RegisterNumber: 1 });
newReqestSchema.index({ PhoneNumber: 1 });
newReqestSchema.index({ status: 1 });

module.exports = mongoose.model('Request', newReqestSchema)