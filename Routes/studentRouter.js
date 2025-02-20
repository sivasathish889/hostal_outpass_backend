const express = require("express");
const routes = express.Router();
const {
  generateHashPassword,
  comparePassword,
} = require("../middleware/bcrypt");
const {
  generateJwtToken,
  verifyJwtToken,
} = require("../middleware/jsonWebToken");
const {
  studentRegisterController,
  verifyOtpController,
} = require("../Controller/studentController/studentRegister");
const studentLoginController = require("../Controller/studentController/studentLoginController");
const {
  newRequestController,
  preRequestController,
  pendingRequestsController,
  editingRequestController,
  deletingPassController,
} = require("../Controller/studentController/requestController");
const {
  studentForgetPassword,
  studentVerifyOtp,
  studentChangePassword,
} = require("../Controller/studentController/studentForgetPassword");
const newRequestModel = require("../Model/Schema/newRequestModel");
const studentModel = require("../Model/Schema/studentModel");

routes.post("/student/register", studentRegisterController);
routes.post("/student/register/verify", verifyOtpController);
routes.post("/student/login", studentLoginController);
routes.post("/student/forgetPassword", studentForgetPassword);
routes.post("/student/forgetPassword/verify", studentVerifyOtp);
routes.post("/student/changePassword", studentChangePassword);
routes.post("/student/newRequest", newRequestController);
routes.get("/student/pendingRequests/:userId", pendingRequestsController);
routes.put("/student/passUpdate", editingRequestController);
routes.delete("/student/passDelete/:passId",deletingPassController)

routes.get("/student/AllRequests/:userId", preRequestController);
routes.get('/student/:userId',async(req,res)=>{
  const userId = req.params.userId;
  try {
    await studentModel.find({_id:userId})
    .then((data)=>{
      return res.status(200).json({message : "Ok", data, success : true})
    })
  } catch (error) {
    
  }
})

module.exports = routes;
