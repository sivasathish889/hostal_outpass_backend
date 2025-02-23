const newRequestModel = require("../../Model/Schema/newRequestModel");

const passAccept = async (req, res) => {
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
const passReject = async (req, res) => {
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

const passPending = async (req, res) => {
  try {
    await newRequestModel.find({ status: "1" }).then(async (pass) => {
      return res.json({ message: "fetching SuccessFull", pass, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const allAcceptPass = async (req, res) => {
  try {
    await newRequestModel
      .find({ status: "2" })
      .sort({ createdAt: "descending" })
      .then((pass) => {
        return res.json({ message: "Accept Passes", pass, success: true });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const allRejectPass = async (req, res) => {
  try {
    await newRequestModel
      .find({ status: "3" })
      .sort({ createdAt: "descending" })
      .then((pass) => {
        return res.json({ message: "Reject Passes", pass, success: true });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};



module.exports = {
  passAccept,
  passReject,
  passPending,
  allAcceptPass,
  allRejectPass,
};
