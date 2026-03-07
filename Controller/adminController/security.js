const { generateHashPassword } = require("../../middleware/bcrypt");
const securityModel = require("../../Model/Schema/securityModel");

const getSecurity = async (req, res) => {
  try {
    const { searchQuery, page = 1, limit = 10 } = req.query;

    const query = {};

    if (searchQuery) {
      query.$or = [
        { userName: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } }
      ];

      const parsedNum = Number(searchQuery);
      if (!isNaN(parsedNum) && searchQuery.trim() !== "") {
        query.$or.push({ phoneNumber: parsedNum });
      } else {
        query.$or.push({ $expr: { $regexMatch: { input: { $toString: "$phoneNumber" }, regex: searchQuery, options: "i" } } });
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const isQueryEmpty = Object.keys(query).length === 0;

    const [users, total] = await Promise.all([
      securityModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      isQueryEmpty ? securityModel.estimatedDocumentCount() : securityModel.countDocuments(query)
    ]);

    return res.json({ 
      message: "Security details", 
      users, 
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      success: true 
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
