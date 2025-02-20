const mongoose = require("mongoose")


const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    RegisterNumber : {
        type : Number,
        required : true
    },
    Department : {
        type : String,
        required : true
    },
    year :{
        type : Number,
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
    Email : {
        type : String,
        required : true
    },
    District : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }

},{timestamps : true})

module.exports = mongoose.model('Students',studentSchema)