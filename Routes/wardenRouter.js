const express = require("express");
const routes = express.Router();
const {
  wardenLoginController,
  wardenData,
  wardenChangePassword,
  wardenForgetPassword
} = require("../Controller/wardenController/authController");
const {
  passAccept,
  passReject,
  passPending,
  allAcceptPass,
  allRejectPass,
} = require("../Controller/wardenController/passController");
const otpVerifier = require("../Controller/verifyOTP");

routes.post("/login", wardenLoginController);

routes.post('/forgetPassword', wardenForgetPassword)

routes.post('/changePassword', wardenChangePassword)

routes.post("/login/verify", otpVerifier)

routes.put("/passAccept", passAccept);

routes.put("/passReject", passReject);

routes.get("/pendingPasses", passPending);

routes.get("/acceptPasses",allAcceptPass);

routes.get("/rejectPasses",allRejectPass);

routes.get("/:user",wardenData)

module.exports = routes;
