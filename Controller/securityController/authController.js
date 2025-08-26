const securityModel = require("../../Model/Schema/securityModel");
const {
  comparePassword,
  generateHashPassword,
} = require("../../middleware/bcrypt");
const { generateJwtToken } = require("../../middleware/jsonWebToken");
const mailSender = require("../../middleware/mailSender");

const securityLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    await securityModel.find({ userName: userName }).then(async (user) => {
      if (user.length > 0) {
        const isPassword = comparePassword(password, user[0]?.password);
        if (isPassword) {
          let Email = user[0]?.email;
          let otp = Math.floor(Math.random() * 10000);
          let subject = "Hostal Outpass OTP";
          let text = `<h1> Dear Security </h1> <br> Your One Time Password (OTP) is ${otp}.`;
          await mailSender(Email, subject, text);

          let payload = {
            otp,
            user: user[0]?._id.toString(),
          };
          console.log(otp)
          let Token = generateJwtToken({ payload });
          let sendingEmailFormat = Email.split("@")[0].slice(0, 4);
          return res.json({
            message: `Otp send ${sendingEmailFormat}*****@gmail.com`,
            Token,
            success: true,
          });
        }
        else{
        return res.json({ message: "Incorrect Password", success: false });

        }
      } else {
        return res.json({ message: "UnAuthorized", success: false });
      }
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const forgetPassword = async (req, res) => {
  const { userName } = req.body;
  await securityModel.find({ userName: userName }).then(async (user) => {
    if (user.length > 0) {
      let Email = user[0]?.email;
      let otp = Math.floor(Math.random() * 10000);
      let subject = "Hostal Outpass OTP";
      let text = `<h1>Dear Security </h1> <br> To reset your password. </br> <h1> Your One-Time Password (OTP) is : ${otp}.</h1>`;
      await mailSender(Email, subject, text);

      let payload = {
        userName,
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
        message: "UserName Not Found",
        success: false,
      });
    }
  });
};

const changePassword = async (req, res) => {
  const { newPassword, confirmNewPassword, userName } = req.body;
  try {
    if (
      String(newPassword).length != 0 &&
      String(confirmNewPassword).length != 0
    ) {
      if (String(newPassword) === String(confirmNewPassword)) {
        securityModel.find({ userName: userName }).then(async (user) => {
          if (user.length > 0) {
            const hashingPassword = comparePassword(
              newPassword,
              user[0]?.password
            );
            if (hashingPassword) {
              return res.json({
                message: "This is Previous Password..Please Enter Different",
              });
            } else {
              const hashPassword = await generateHashPassword(newPassword);
              await securityModel.findOneAndUpdate(
                { userName: userName },
                { $set: { password: hashPassword } },
                { new: true }
              );
              return res
                .status(200)
                .json({ message: "Password Changed", success: true });
            }
          } else {
            return res.json({
              message: "userName Not Found",
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
  securityLogin,
  forgetPassword,
  changePassword,
};
