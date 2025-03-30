const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    RegisterNumber: {
      type: Number,
      required: true,
      unique: true,
      null: false,
    },
    Department: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    Gender : {
      type : String,
      required : true
    },
    PhoneNumber: {
      type: Number,
      required: true,
    },
    ParentNumber: {
      type: Number,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      null: false,
    },
    District: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);
