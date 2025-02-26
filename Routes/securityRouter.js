const express = require("express");
const routes = express.Router();

const {
  securityLogin,
  forgetPassword,
  changePassword,
} = require("../Controller/securityController/authController");

const {
  securityData,
} = require("../Controller/securityController/getCotroller");
const otpVerifier = require("../Controller/verifyOTP");
const newRequestModel = require("../Model/Schema/newRequestModel");

routes.post("/login", securityLogin);

routes.post("/login/verify", otpVerifier);

routes.post("/forgetPassword", forgetPassword);

routes.post("/changePassword", changePassword);

routes.get("/finishedPasses", async (req, res) => {
  // console.log("iush");
  // const date = new Date();
  // const month = date.getMonth();
  // const year = date.getFullYear();
  // const startDate = new Date(year, month + 1, 1);
  // const endDate = new Date();
  // console.log(startDate, endDate);

  // const filters = {
  //   createdAt: {
  //     $gte: startDate,
  //     $lt: endDate,
  //   },
  // };

  try {
    await newRequestModel
      .find({ status: "2" })
      .sort({ createdAt: "descending" })
      .then((pass) => {
        return res.json({
          message: "fetced Data successFully",
          pass,
          success: true,
        });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.put("/updateOutTime", async (req, res) => {
  const { id, userId } = req.body;
  try {
    await newRequestModel
      .findByIdAndUpdate(
        id,
        { studentOutTime: new Date().toLocaleString(), security: userId },
        { new: true }
      )
      .then(() => {
        return res.json({ message: "Out Time Registered", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.put("/updateInTime", async (req, res) => {
  const { id, userId } = req.body;
  try {
    await newRequestModel
      .findByIdAndUpdate(
        id,
        {
          studentInTime: new Date().toLocaleString(),
          security: userId,
          status: "completed",
        },
        { new: true }
      )
      .then(() => {
        return res.json({ message: "In Time Registered", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
});

routes.get("/:user", securityData);
module.exports = routes;
