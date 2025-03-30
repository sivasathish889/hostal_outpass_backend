const {
  comparePassword,
  generateHashPassword,
} = require("../../middleware/bcrypt");
const studentModel = require("../../Model/Schema/studentModel");
const mailSender = require("../../middleware/mailSender");
const {
  generateJwtToken,
  verifyJwtToken,
} = require("../../middleware/jsonWebToken");

const LoginController = async (req, res) => {
  try {
    const { registerNumber, password } = req.body;
    await studentModel.find({ RegisterNumber: registerNumber }).then((user) => {
      if (user.length > 0) {
        if (comparePassword(password, user[0]?.Password)) {
          return res.status(200).json({
            message: "Login Successfull",
            success: true,
            user: user[0]?._id.toString(),
          });
        } else {
          return res.json({ message: "Incorrect Password", success: false });
        }
      } else {
        return res.json({
          message: "Register Number Not found",
          success: false,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const registerController = async (req, res) => {
  try {
    let {
      name,
      registerNumber,
      department,
      eMail,
      year,
      gender,
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
      gender != null &&
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
              return res.json({
                message: "Already Regsitered",
                success: false,
              });
            } else {
              await studentModel.find({ Email: eMail }).then((emailUser) => {
                if (emailUser.length > 0) {
                  return res.json({
                    message: "Email Already Used",
                    success: false,
                  });
                } else {
                  let hashingPassword = generateHashPassword(password);
                  let otp = Math.floor(Math.random() * 10000);
                  let payload = {
                    name,
                    registerNumber,
                    department,
                    eMail,
                    year,
                    gender,
                    phoneNumber,
                    parentNumber,
                    district,
                    hashingPassword,
                    otp,
                  };
                  let Token = generateJwtToken({ payload });
                  let subject = "Hostal Outpass OTP";
                  let text = `<h1>Dear ${name} </h1> <br> <h4> Thank you for initiating the account verification process.</h4> <br> <h1> Your One-Time Password (OTP) is :${otp}.</h1>`;
                  mailSender(eMail, subject, text);
                  let sendingEmailFormat = eMail.split("@")[0].slice(0, 4);
                  return res
                    .status(200)
                    .json({
                      message: `Otp send ${sendingEmailFormat}*****@gmail.com`,
                      Token,
                      success: true,
                    });
                }
              });
            }
          });
      } else {
        return res.json({
          message: "Password Does Not Matched",
          success: false,
        });
      }
    } else {
      return res.json({ message: "Please Fill The details", success: false });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const registerOtpController = async (req, res) => {
  try {
    const { otp, Token } = req.body;
    let tokens = Token;
    if (tokens) {
      const userData = verifyJwtToken(tokens).payload;
      if (Number(otp) === Number(userData.otp)) {
        await studentModel.create({
          name: userData.name,
          RegisterNumber: userData.registerNumber,
          Department: userData.department,
          year: userData.year,
          Gender : userData.gender,
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
        return res.json({ message: "Incorrect OTP", success: false });
      }
    } else {
      return res.json({ message: "OTP expired" });
    }
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const forgetPassword = async (req, res) => {
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
            let text = `<h1>Dear User </h1> <br> To reset your password. </br> <h1> Your One-Time Password (OTP) is : ${otp}.</h1>`;
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

const changePassword = (req, res) => {
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

const studentData = async (req, res) => {
  const userId = req.params.userId;
  try {
    await studentModel.find({ _id: userId }).then((data) => {
      return res.status(200).json({ message: "Ok", data, success: true });
    });
  } catch (error) {}
};

module.exports = {
  LoginController,
  registerController,
  registerOtpController,
  changePassword,
  forgetPassword,
  studentData,
};
