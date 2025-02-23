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
    Distination : {
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
    status : {
        type : String,
        required : true,
        default  : 1
    },
    User : {
        type : mongoose.Types.ObjectId,
        ref : "Students",
        required : true
    },
    warden : {
        type : mongoose.Types.ObjectId,
        ref : "Warden",
        required : true,
        null : false
    }

},{timestamps : true,})

module.exports = mongoose.model('Request', newReqestSchema)