const newRequestModel = require("../../Model/Schema/newRequestModel");

const getPass = async (req, res) => {
    try {
      await newRequestModel
        .find({ status: "completed", delete: false })
        .then((users) => {
          return res.json({ message: "Passes details", users, success: true });
        });
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  };
  
  const deletePass = async (req, res) => {
    try {
      await newRequestModel.findByIdAndDelete(req.params.id).then(() => {
        return res.json({ message: "Passes Deleted", success: true });
      });
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  };

  
  module.exports = {
    getPass,
    deletePass,
  };