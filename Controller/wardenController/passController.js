const newRequestModel = require("../../Model/Schema/newRequestModel");

const passAcceptController = async (req, res) => {
  const passId = req.params.id;
  try {
    await newRequestModel
      .findByIdAndUpdate(passId, { status: "2" }, { new: true })
      .then(() => {
        return res.json({ message: "Pass Accepted", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};
const passRejectConroller = async (req, res) => {
  const passId = req.params.id;
  try {
    await newRequestModel
      .findByIdAndUpdate(passId, { status: "3" }, { new: true })
      .then(() => {
        return res.json({ message: "Pass Rejected", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const passPendingConroller = async (req, res) => {
  try {
    await newRequestModel.find({ status: "1" }).then(async (pass) => {
      return res.json({ message: "fetching SuccessFull", pass, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const allAcceptController = async (req, res) => {};
module.exports = {
  passAcceptController,
  passRejectConroller,
  passPendingConroller,
  allAcceptController,
};
