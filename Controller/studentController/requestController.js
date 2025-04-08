
const newRequestModel = require("../../Model/Schema/newRequestModel");
const studentModel = require("../../Model/Schema/studentModel");

const newRequest = async (req, res) => {
  const { roomNo, destination, purpose, inDateTime, outDateTime, userId } =
    req.body;
  let gender;
  try {
    if (
      destination ||
      roomNo ||
      purpose ||
      (outDateTime && inDateTime) ||
      userId
    ) {
      await studentModel.findOne({ _id: userId }).then((user) => {
        gender = user.Gender
        newRequestModel.create({
          RegisterNumber: user.RegisterNumber,
          name: user.name,
          year: user.year,
          Department: user.Department,
          PhoneNumber: user.PhoneNumber,
          ParentNumber: user.ParentNumber,
          Gender: user.Gender,
          Destination: destination,
          InDateTime: inDateTime,
          OutDateTime: outDateTime,
          Purpose: purpose,
          RoomNo: roomNo,
          User: userId,
        });
      });
      return res
        .status(200)
        .json({ message: "Request Created", gender, success: true });
    } else {
      return res.json({ message: "Invalid Creditionals", success: false });
    }
  } catch (error) {
    return res.json({ message: "Server Error", success: false });
  }
};

const pendingRequests = (req, res) => {
  let { userId } = req.params;
  newRequestModel
    .find({ User: userId, status: 1, delete: false })
    .then((pass) => {
      return res.status(200).json({ pass, success: true });
    })
    .catch((error) => {
      return res.json({ message: "Server Error", success: false });
    });
};

const editingRequest = async (req, res) => {
  try {
    const { roomNo, destination, purpose, inDateTime, outDateTime, passId } =
      req.body;
    await newRequestModel
      .findByIdAndUpdate(
        passId,
        {
          RoomNo: roomNo,
          Distination: destination,
          Purpose: purpose,
          InDateTime: inDateTime,
          OutDateTime: outDateTime,
        },
        { new: true }
      )
      .catch((error) => {
        return res.json({ message: "server Error", success: false });
      });
    return res
      .status(200)
      .json({ message: "Update SuccessFully", success: true });
  } catch (error) {
    return res.json({ message: "Server Error", success: false });
  }
};

const deletingPass = async (req, res) => {
  try {
    await newRequestModel.findByIdAndUpdate(req.params.passId, {
      delete: true,
    });
    return res.status(200).json({ message: "Pass Deleted", success: true });
  } catch (error) {
    return res.json({ message: "Server Error", success: false });
  }
};

const preRequest = async (req, res) => {
  try {
    const userId = req.params.userId;
    await newRequestModel
      .find({
        User: userId,
        $or: [{ status: "3" }, { status: "2" }],
        delete: false,
      })
      .sort({ createdAt: "descending" })
      .then((data) => {
        return res.status(200).json({ message: "Users", data, success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: "Server Error", success: false });
  }
};

module.exports = {
  newRequest,
  preRequest,
  pendingRequests,
  editingRequest,
  deletingPass,
};
