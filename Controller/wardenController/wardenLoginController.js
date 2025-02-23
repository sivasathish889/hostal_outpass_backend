const wardenModel = require("../../Model/Schema/wardenModel");
const {
  generateJwtToken,
  verifyJwtToken,
} = require("../../middleware/jsonWebToken");
const mailSender = require("../../middleware/mailSender");

const wardenLoginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    await wardenModel
      .find({ userName: userName, password: password })
      .then(async (user) => {
        if (user.length > 0) {
          let Email = user[0]?.email;
          let otp = Math.floor(Math.random() * 10000);
          let subject = "Hostal Outpass OTP";
          let text = `Warden Login Verify...  Your OTP is ${otp}.`;
          await mailSender(Email, subject, text);

          let payload = {
            otp,
            user : user[0]?._id.toString()
          };
          let Token = generateJwtToken({ payload });
          let sendingEmailFormat = Email.split("@")[0].slice(0, 4);
          return res.json({
            message: `Otp send ${sendingEmailFormat}*****@gmail.com`,
            Token,
            success: true,
          });
        } else {
          return res.json({ message: "UnAuthorized", success: false });
        }
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};


const wardenData = async (req, res) => {
  const userId = req.params.user;
  try {
    await wardenModel.find({ _id: userId }).then((data) => {
      return res.status(200).json({ message: "Ok", data, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

module.exports = { wardenLoginController, wardenData };
