const express = require("express");
const routes = express.Router();
const mailSender = require("../middleware/mailSender");

const {
  securityLogin,
  forgetPassword,
  changePassword,
} = require("../Controller/securityController/authController");

const {
  securityData,
} = require("../Controller/securityController/getCotroller");
const otpVerifier = require("../Controller/verifyOTP")

routes.post("/login", securityLogin);

routes.post("/login/verify",otpVerifier );

routes.post("/forgetPassword", forgetPassword);

routes.post("/changePassword", changePassword);

routes.get("/:user", securityData);

module.exports = routes;
