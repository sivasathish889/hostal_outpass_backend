const {
  generateJwtToken,
  verifyJwtToken,
} = require("../../middleware/jsonWebToken");
const studentModel = require("../../Model/Schema/studentModel");
const mailSender = require("../../middleware/mailSender");
const {
  comparePassword,
  generateHashPassword,
} = require("../../middleware/bcrypt");

const studentForgetPassword = async (req, res) => {
  try {
    const { registerNumber } = req.body;
    
    if (registerNumber != null) {
      await studentModel
        .find({ RegisterNumber: registerNumber })
        .then(async (user) => {
          if (user.length > 0) {
            let Email = user[0]?.Email;
            let otp = Math.floor(Math.random() * 10000);
            let subject = "Hostal Outpass OTP";
            let text = `Forget Password.. <h1> Your OTP is ${otp}. </h1>`;
            await mailSender(Email, subject, text);
            let payload = {
              registerNumber,
              otp,
            };
            let Token = generateJwtToken({ payload });
            let sendingEmailFormat = Email.split("@")[0].slice(0, 4);
            return res.status(200).json({
              message: `Otp send ${sendingEmailFormat}*****@gmail.com`,
              Token,
              success: true,
            });
          } else {
            return res.json({
              message: "Regsiter Number Not Found",
              success: false,
            });
          }
        });
    } else {
      return res.json({ message: "Invalid Regsiter Number", success: false });
    }
  } catch (error) {
    return res.json({ message: "Server error", success: false });
  }
};

const studentVerifyOtp = (req, res) => {
  try {
    const { backendOtp, otp } = req.body;
    const verifyOtp = verifyJwtToken(backendOtp).payload.otp;
    
    if (Number(otp) === Number(verifyOtp)) {
      return res
        .status(200)
        .json({ message: "OTP successfully verified", success: true });
    } else {
      return res.json({ message: "Wrong OTP", success: false });
    }
  } catch (error) {
    return res.json({ message: "Server error", success: false });
  }
};

const studentChangePassword = (req, res) => {
  const { newPassword, confirmNewPassword, registerNumber } = req.body;
  try {
    if (
      String(newPassword).length != 0 &&
      String(confirmNewPassword).length != 0
    ) {
      if (String(newPassword) === String(confirmNewPassword)) {
        studentModel
          .find({ RegisterNumber: registerNumber })
          .then(async (user) => {
            if (user.length > 0) {
              const hashingPassword = comparePassword(
                newPassword,
                user[0]?.Password
              );
              if (hashingPassword) {
                return res.json({
                  message: "This is Previous Password..Please Enter Different",
                });
              } else {
                const hashPassword = await generateHashPassword(newPassword);
                await studentModel.findOneAndUpdate(
                  { RegisterNumber: registerNumber },
                  { $set: { Password: hashPassword } },
                  { new: true }
                );
                return res
                  .status(200)
                  .json({ message: "Password Changed", success: true });
              }
            } else {
              return res.json({
                message: "Regsiter Number Not Found",
                success: false,
              });
            }
          });
      } else {
        return res.json({
          message: "Please Enter Same Password",
          success: false,
        });
      }
    } else {
      return res.json({ message: "Please Enter Password", success: false });
    }
  } catch (error) {
    return res.json({ message: "Server error", success: false });
  }
};

module.exports = {
  studentForgetPassword,
  studentVerifyOtp,
  studentChangePassword,
};
