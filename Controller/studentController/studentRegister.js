const { generateHashPassword } = require("../../middleware/bcrypt");
const {
  generateJwtToken,
  verifyJwtToken,
} = require("../../middleware/jsonWebToken");
const studentModel = require("../../Model/Schema/studentModel");
const mailSender = require("../../middleware/mailSender");

const studentRegisterController = async (req, res) => {
  try {
    let {
      name,
      registerNumber,
      department,
      eMail,
      year,
      phoneNumber,
      parentNumber,
      district,
      password,
      confirmPassword,
    } = req.body;
    if (
      name != null &&
      registerNumber != null &&
      department != null &&
      eMail != null &&
      year != null &&
      phoneNumber != null &&
      parentNumber != null &&
      district != null &&
      password != null &&
      confirmPassword != null
    ) {
      if (password === confirmPassword) {
        await studentModel
          .find({ RegisterNumber: registerNumber })
          .then(async (user) => {
            if (user.length > 0) {
              return res
                .json({ message: "Already Regsitered", success: false });
            } else {
              let hashingPassword = generateHashPassword(password);
              let otp = Math.floor(Math.random() * 10000);
              let payload = {
                name,
                registerNumber,
                department,
                eMail,
                year,
                phoneNumber,
                parentNumber,
                district,
                hashingPassword,
                otp,
              };
              let Token = generateJwtToken({ payload });
              let subject = "Hostal Outpass OTP";
              let text = `<h1> Your OTP is ${otp}. This is expired in 5 Minutes </h1>`;
              mailSender(eMail, subject, text)
              //  cookie maximum age 5 minutes
              return res
                .status(200)
                .json({ message: "OTP send", Token, success: true });
            }
          });
      } else {
        return res
          .json({ message: "Password Does Not Matched", success: false });
      }
    } else {
      return res
        .json({ message: "Please Fill The details", success: false });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { otp ,Token} = req.body;
    let tokens = Token
    if (tokens) {
      const userData = verifyJwtToken(tokens).payload;
      if (Number(otp) === Number(userData.otp)) {
        await studentModel.create({
          name: userData.name,
          RegisterNumber: userData.registerNumber,
          Department: userData.department,
          year: userData.year,
          PhoneNumber: userData.phoneNumber,
          ParentNumber: userData.parentNumber,
          District: userData.district,
          Password: userData.hashingPassword,
          Email: userData.eMail,
        });
        return res
          .status(200)
          .json({ message: "Register Successfully..", success: true });
      } else {
        return res
          .json({ message: "Incorrect OTP", success: false });
      }
    } else {
      return res.json({ message: "OTP expired" });
    }
  } catch (error) {
    return res.json({ message: error.message , success:false});
  }
};

module.exports = { studentRegisterController, verifyOtpController };
