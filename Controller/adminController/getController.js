const studentModel = require("../../Model/Schema/studentModel");
const wardenModel = require("../../Model/Schema/wardenModel");
const securityModel = require("../../Model/Schema/securityModel");
const newRequestModel = require("../../Model/Schema/newRequestModel");

const getStudentList = async (req, res) => {
  try {
    await studentModel.find().then((users) => {
      return res.json({ message: "Student details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const getWardenList = async (req, res) => {
  try {
    await wardenModel.find().then((users) => {
      return res.json({ message: "Warden details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const getSecurity = async (req, res) => {
  try {
    await securityModel.find().then((users) => {
      return res.json({ message: "Security details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const getPass = async (req, res) => {
  try {
    await newRequestModel.find({status: "completed", delete : false}).then((users) => {
      return res.json({ message: "Passes details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const deletePass =async(req,res)=>{
  try {
    await newRequestModel.findByIdAndDelete(req.params.id).then(() => {
      return res.json({ message: "Passes Deleted", success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}
module.exports = { getStudentList, getWardenList, getSecurity, getPass,deletePass };
