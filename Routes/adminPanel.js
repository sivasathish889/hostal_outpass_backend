const express = require("express");
const {
  getStudentList,
  getWardenList,
  getSecurity,
  getPass,
  deletePass
} = require("../Controller/adminController/getController");
const routes = express.Router();

routes.get("/getStudentList", getStudentList);
routes.get("/getWardenList", getWardenList);
routes.get("/getSecurityList", getSecurity);
routes.get("/getPass", getPass);
routes.delete("/deletePass/:id", deletePass);

module.exports = routes;
