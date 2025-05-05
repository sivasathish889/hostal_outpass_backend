const { verifyJwtToken } = require("../middleware/jsonWebToken");
const wardenModel = require("../Model/Schema/wardenModel");
const securityModel = require("../Model/Schema/securityModel");

const otpVerifier = async (req, res) => {
  try {
    const { backendOtp, otp, warden, security, fcmToken } = req.body;
    const verifyOtp = verifyJwtToken(backendOtp).payload.otp;
    const user = verifyJwtToken(backendOtp).payload.user;
    const wardenGender = verifyJwtToken(backendOtp).payload.gender;

    if (Number(otp) === Number(verifyOtp)) {
      if (warden) {
        console.log("warden", user);
        await wardenModel.findOneAndUpdate(
          { _id: user },
          { FCMToken: fcmToken },
          { new: true }
        );
      } else if (security) {
        await securityModel.findOneAndUpdate(
          { _id: user._id },
          { FCMToken: fcmToken },
          { new: true }
        );
      }
      return res.status(200).json({
        message: "OTP successfully verified",
        user,
        wardenGender,
        success: true,
      });
    } else {
      return res.json({ message: "Wrong OTP", success: false });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Server error", success: false });
  }
};

module.exports = otpVerifier;
