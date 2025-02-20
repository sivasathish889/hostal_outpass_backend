const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Db connected");
  } catch (error) {
    console.log("Db error")
  }
};

module.exports = db;
