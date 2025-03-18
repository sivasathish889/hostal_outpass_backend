const express = require("express");
const routes = express.Router();

const { registerController, registerOtpController, LoginController, forgetPassword, changePassword, studentData } = require("../Controller/studentController/authController");
const { newRequest, pendingRequests, editingRequest, deletingPass, preRequest } = require("../Controller/studentController/requestController");
const otpVerifier = require("../Controller/verifyOTP");



routes.post("/student/register", registerController);
routes.post("/student/register/verify", registerOtpController);
routes.post("/student/login", LoginController);
routes.post("/student/forgetPassword", forgetPassword);
routes.post("/student/forgetPassword/verify", otpVerifier);
routes.post("/student/changePassword", changePassword);
routes.post("/student/newRequest", newRequest);
routes.get("/student/pendingRequests/:userId", pendingRequests);
routes.put("/student/passUpdate", editingRequest);
routes.post("/student/passDelete/:passId",deletingPass)

routes.get("/student/AllRequests/:userId", preRequest);
routes.get('/student/:userId',studentData)

module.exports = routes;
