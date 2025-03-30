const { verifyJwtToken } = require("../middleware/jsonWebToken");

const otpVerifier = (req, res) => {
  try {
    const { backendOtp, otp } = req.body;
    const verifyOtp = verifyJwtToken(backendOtp).payload.otp;
    const user = verifyJwtToken(backendOtp).payload.user;
    const wardenRole = verifyJwtToken(backendOtp).payload.role;
    if (Number(otp) === Number(verifyOtp)) {
      return res
        .status(200)
        .json({
          message: "OTP successfully verified",
          user,
          wardenRole,
          success: true,
        });
    } else {
      return res.json({ message: "Wrong OTP", success: false });
    }
  } catch (error) {
    return res.json({ message: "Server error", success: false });
  }
};

module.exports = otpVerifier;
