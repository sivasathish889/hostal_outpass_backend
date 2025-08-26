const newRequestModel = require("../../Model/Schema/newRequestModel");
const wardenModel = require("../../Model/Schema/wardenModel");
const studentModel = require("../../Model/Schema/studentModel");
const passAccept = async (req, res) => {
  const { id, userId } = req.body;

  try {
    await wardenModel.findById(userId).then(async (data) => {
      await newRequestModel
        .findByIdAndUpdate(
          id,
          { status: "2", warden: data.userName },
          { new: true }
        )
        .then(async () => {
          await studentModel.findById(id).then((studentData) => {
            if (studentData.FCMToken) {
              const dataPayload = {
                title: "Your Pass Accepted",
                body: `Your Pass Accepted By ${data.userName}`,
                screen: "/(student)/(tabs)/prevPass",
              };
              notificationSend(studentData.FCMToken, dataPayload);
            }
          });
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
    await wardenModel.findById(userId).then(async (data) => {
      await newRequestModel
        .findByIdAndUpdate(
          id,
          { status: "3", warden: data.userName },
          { new: true }
        )
        .then(async () => {
          await studentModel.findById(id).then((studentData) => {
            if (studentData.FCMToken) {
              const dataPayload = {
                title: "Your Pass Rejected",
                body: `Your Pass Rejected By ${data.userName}`,
                screen: "/(student)/(tabs)/prevPass",
              };
              notificationSend(studentData.FCMToken, dataPayload);
            }
          });
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
    await wardenModel
      .findOne({ _id: req.params.id })
      .then(async (wardenName) => {
        await newRequestModel
          .find({ status: "1", delete: false, Gender: wardenName.gender })
          .then(async (pass) => {
            return res.json({
              message: "fetching SuccessFull",
              pass,
              success: true,
            });
          });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const allAcceptPass = async (req, res) => {
  try {
    await wardenModel.findOne({ _id: req.params.id }).then(async (warden) => {
      await newRequestModel
        .find({ status: "2", delete: false, warden: warden.userName })
        .sort({ createdAt: "descending" })
        .then((pass) => {
          return res.json({ message: "Accept Passes", pass, success: true });
        });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const allRejectPass = async (req, res) => {
  try {
    await wardenModel.findOne({ _id: req.params.id }).then(async (warden) => {
      await newRequestModel
        .find({ status: "3", delete: false, warden: warden.userName })
        .sort({ createdAt: "descending" })
        .then((pass) => {
          console.log(pass);
          return res.json({ message: "Reject Passes", pass, success: true });
        });
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
