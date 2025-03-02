const express = require("express");
const routes = express.Router();

const {
  securityLogin,
  forgetPassword,
  changePassword,
} = require("../Controller/securityController/authController");

const {
  securityData,
  finishedPasses,
  updateOutTmePass,
  updateInTimePass,
} = require("../Controller/securityController/getCotroller");
const otpVerifier = require("../Controller/verifyOTP");
const newRequestModel = require("../Model/Schema/newRequestModel");

routes.post("/login", securityLogin);

routes.post("/login/verify", otpVerifier);

routes.post("/forgetPassword", forgetPassword);

routes.post("/changePassword", changePassword);

routes.get("/finishedPasses", finishedPasses);

routes.put("/updateOutTime", updateOutTmePass);

routes.put("/updateInTime", updateInTimePass);

routes.get("/:user", securityData);


module.exports = routes;
