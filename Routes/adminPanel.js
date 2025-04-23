const express = require("express");

const {
  getStudentList,
  updateStudent,
  deleteStudent,
} = require("../Controller/adminController/student");
const {
  getWardenList,
  createWarden,
  updateWarden,
  deleteWarden,
} = require("../Controller/adminController/warden");
const { deletePass, getPass } = require("../Controller/adminController/passes");
const {
  getSecurity,
  createSecurity,
  updateSecurity,
  deleteSecurity,
} = require("../Controller/adminController/security");
const {
  login,
  register,
  getUserData,
} = require("../Controller/adminController/auth");
const routes = express.Router();

routes.get("/getStudentList", getStudentList);
routes.get("/getWardenList", getWardenList);
routes.get("/getSecurityList", getSecurity);
routes.get("/getPass", getPass);

routes.delete("/deletePass/:id", deletePass);

routes.post("/createWarden", createWarden);
routes.put("/updateWarden/:_id", updateWarden);
routes.delete("/deleteWarden/:_id", deleteWarden);

routes.post("/createSecurity", createSecurity);
routes.put("/updateSecurity/:_id", updateSecurity);
routes.delete("/deleteSecurity/:_id", deleteSecurity);

routes.delete("/deleteStudent/:_id", deleteStudent);
routes.put("/updateStudent/:_id", updateStudent);

routes.post("/login", login);
routes.post("/register", register);

routes.get("/get-userData/:id", getUserData);
module.exports = routes;
