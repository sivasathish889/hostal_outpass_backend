const securityModel = require("../../Model/Schema/securityModel");


const securityData =  async (req, res) => {
    const userId = req.params.user;
    try {
      await securityModel.find({ _id: userId }).then((data) => {
        console.log(data);
  
        return res.status(200).json({ message: "Ok", data, success: true });
      });
    } catch (error) {
      return res.json({ message: error.message, success: false });
    }
  }


  module.exports = {securityData}