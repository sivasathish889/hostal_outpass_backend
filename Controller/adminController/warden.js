const { generateHashPassword } = require("../../middleware/bcrypt");
const wardenModel = require("../../Model/Schema/wardenModel");

const getWardenList = async (req, res) => {
  try {
    await wardenModel.find().then((users) => {
      return res.json({ message: "Warden details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const createWarden = async (req, res) => {
  const { userName, email, gender, phoneNumber, password } = req.body;
  if (userName || email || gender || phoneNumber || password) {
    try {
      await wardenModel
        .find({ $or: [{ userName }, { email }] })
        .then(async (user) => {
          if (user.length > 0) {
            return res.json({
              message: "Email & Username already created",
              success: false,
            });
          }
          await wardenModel.find({ phoneNumber }).then(async (exisitPhone) => {
            if (exisitPhone.length > 0) {
              return res.json({
                message: "Phone Number already used",
                success: false,
              });
            } else {
              const hashPassword = generateHashPassword(password);
              await wardenModel
                .create({
                  userName: userName,
                  email: email,
                  role: gender,
                  phoneNumber: phoneNumber,
                  password: hashPassword,
                })
                .then((data) => {
                  return res.json({
                    message: "Warden Created",
                    success: true,
                  });
                });
            }
          });
        });
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  } else {
    return res.json({ message: "Required fields", success: false });
  }
};

const updateWarden = async (req, res) => {
  const _id = req.params;
  const { userName, email, phoneNumber, role } = req.body;
  try {
    await wardenModel
      .find({ $or: [{ userName }, { email }] })
      .then(async (user) => {
        if (user.length > 0) {
          return res.json({
            message: "Email & Username already created",
            success: false,
          });
        }
        await wardenModel.find({ phoneNumber }).then(async (exisitPhone) => {
          if (exisitPhone.length > 0) {
            return res.json({
              message: "Phone Number already used",
              success: false,
            });
          } else {
            await wardenModel
              .findByIdAndUpdate(_id, {
                userName,
                email,
                phoneNumber,
                role,
              })
              .then(() => {
                return res.json({
                  message: "Updated Successfully",
                  success: true,
                });
              })
              .catch((error) => {
                return res.json({ message: error.message, success: false });
              });
          }
        });
      });
  } catch (error) {
    return res.json({ message: "Internel Server Error", success: false });
  }
};

const deleteWarden = async (req, res) => {
  const _id = req.params;
  try {
    await wardenModel
      .findByIdAndDelete(_id)
      .then(() => {
        return res.json({ message: "Deleted Successfully", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: "Internel Server Error", success: false });
  }
};

module.exports = { getWardenList, createWarden, updateWarden, deleteWarden };
