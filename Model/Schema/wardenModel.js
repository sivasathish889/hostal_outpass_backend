const mongoose = require("mongoose");

const wardenSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      null: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      null: false,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      null: false,
    },
    role : {
      type : String,
      required : true,
      null : false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warden", wardenSchema);
