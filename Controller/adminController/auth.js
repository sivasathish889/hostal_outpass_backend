const {
  generateHashPassword,
  comparePassword,
} = require("../../middleware/bcrypt");
const adminModel = require("../../Model/Schema/adminModel");

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.json({ message: "Fields Required", success: false });
    }
    await adminModel
      .findOne({ userName })
      .then((user) => {
        if (!user) {
          return res.json({ message: "UserName Invalid", success: false });
        }
        const passCompare = comparePassword(password, user.password);
        const userID = user._id;
        if (passCompare) {
          return res.json({
            message: "Login Successful",
            success: true,
            userID,
          });
        } else {
          return res.json({ message: "Incorrect Password", success: false });
        }
      })
      .catch((err) => {
        return res.json({ message: err.message, success: false });
      });
  } catch (error) {
    return res.json({ message: "server error", success: false });
  }
};

const register = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password) {
      return res.json({ message: "Fields Required", success: false });
    }
    await adminModel.find({ userName }).then(async (data) => {
      if (data.length > 0) {
        return res.json({ message: "User Name Already Used", success: false });
      } else {
        const hashPassword = generateHashPassword(password);
        await adminModel
          .create({ userName, password: hashPassword })
          .then((user) => {
            return res.json({ message: "User Created", success: true });
          });
      }
    });
  } catch (error) {}
};

const getUserData = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await adminModel.findById(id).then((data) => {
        return res.json({ message: "data fetched", data, success: true });
      });
    } else {
      return res.json({ message: "Fetched Error", success: false });
    }
  } catch (error) {
    return res.json({ message: "server error", success: false });
  }
};
module.exports = { login, register, getUserData };
