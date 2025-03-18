const newRequestModel = require("../../Model/Schema/newRequestModel");
const wardenModel = require("../../Model/Schema/wardenModel");

const passAccept = async (req, res) => {
  const { id, userId } = req.body;

  try {
    await wardenModel
      .find({ _id: userId})
      .then(async (data) => {
        await newRequestModel
          .findByIdAndUpdate(
            id,
            { status: "2", warden: data[0].userName },
            { new: true }
          )
          .then(() => {
            return res.json({ message: "Pass Accepted", success: true });
          })
          .catch((error) => {
            return res.json({ message: error.message, success: false });
          });
      });
  } catch (error) {
    
    return res.json({ message: error.message, success: false });
  }
};
const passReject = async (req, res) => {
  const { id, userId } = req.body;
  try {
    await wardenModel.find({ _id: userId }).then(async (data) => {
      await newRequestModel
        .findByIdAndUpdate(
          id,
          { status: "3", warden: data[0].userName },
          { new: true }
        )
        .then(() => {
          return res.json({ message: "Pass Rejected", success: true });
        })
        .catch((error) => {
          return res.json({ message: error.message, success: false });
        });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const passPending = async (req, res) => {
  try {
    await newRequestModel
      .find({ status: "1", delete: false })
      .then(async (pass) => {
        return res.json({
          message: "fetching SuccessFull",
          pass,
          success: true,
        });
      });
  } catch (error) {
    console.log(error);
    
    return res.json({ message: error.message, success: false });
  }
};

const allAcceptPass = async (req, res) => {
  try {
    await newRequestModel
      .find({ status: "2", delete: false })
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
      .find({ status: "3", delete: false })
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
