const { generateHashPassword } = require("../../middleware/bcrypt");
const securityModel = require("../../Model/Schema/securityModel");

const getSecurity = async (req, res) => {
  try {
    await securityModel.find().then((users) => {
      return res.json({ message: "Security details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const createSecurity = async (req, res) => {
  const { userName, email, phoneNumber, password } = req.body;
  if (userName || email || phoneNumber || password) {
    try {
      await securityModel
        .find({ $or: [{ userName }, { email }] })
        .then(async (user) => {
          if (user.length > 0) {
            return res.json({
              message: "Email & Username already created",
              success: false,
            });
          }
          await securityModel
            .find({ phoneNumber })
            .then(async (exisitPhone) => {
              if (exisitPhone.length > 0) {
                return res.json({
                  message: "Phone Number already used",
                  success: false,
                });
              } else {
                const hashPassword = generateHashPassword(password);
                await securityModel
                  .create({
                    userName: userName,
                    email: email,
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

const updateSecurity = async (req, res) => {
  const _id = req.params;
  const { userName, email, phoneNumber } = req.body;
  try {
    await securityModel
      .find({ $or: [{ userName }, { email }] })
      .then(async (user) => {
        if (user.length > 0) {
          return res.json({
            message: "Email & Username already created",
            success: false,
          });
        }
        await securityModel.find({ phoneNumber }).then(async (exisitPhone) => {
          if (exisitPhone.length > 0) {
            return res.json({
              message: "Phone Number already used",
              success: false,
            });
          } else {
            await securityModel
              .findByIdAndUpdate(_id, {
                userName,
                email,
                phoneNumber,
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

const deleteSecurity = async (req, res) => {
  const _id = req.params;
  try {
    await securityModel
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

module.exports = {
  getSecurity,
  createSecurity,
  updateSecurity,
  deleteSecurity,
};
