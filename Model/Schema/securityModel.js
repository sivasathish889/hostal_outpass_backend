const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema(
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
      null: false,
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
    FCMToken: {
      type: String,
      required: false,
      null: true,
      default : null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("security", securitySchema);
