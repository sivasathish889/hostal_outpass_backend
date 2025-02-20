const mongoose = require("mongoose")

const wardenSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    }
},{timestamps:true})

module.exports = mongoose.model('Warden', wardenSchema)