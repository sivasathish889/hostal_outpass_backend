const newRequestModel = require("../../Model/Schema/newRequestModel");
const securityModel = require("../../Model/Schema/securityModel");

const finishedPasses = async (req, res) => {
  // console.log("iush");
  // const date = new Date();
  // const month = date.getMonth();
  // const year = date.getFullYear();
  // const startDate = new Date(year, month + 1, 1);
  // const endDate = new Date();
  // console.log(startDate, endDate);

  // const filters = {
  //   createdAt: {
  //     $gte: startDate,
  //     $lt: endDate,
  //   },
  // };

  try {
    await newRequestModel
      .find({ status: "2" })
      .sort({ createdAt: "descending" })
      .then((pass) => {
        return res.json({
          message: "fetced Data successFully",
          pass,
          success: true,
        });
      })
      
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};
const updateOutTmePass =async (req, res) => {
  const { id, userId } = req.body;
  try {
    await newRequestModel
      .findByIdAndUpdate(
        id,
        { studentOutTime: new Date().toLocaleString(), security: userId },
        { new: true }
      )
      .then(() => {
        return res.json({ message: "Out Time Registered", success: true });
      })
      .catch((error) => {
        return res.json({ message: error.message, success: false });
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}

const updateInTimePass = async (req, res) => {
  const { id, userId } = req.body;
  try {
  await newRequestModel.find({ _id: id }).then(async(data) => {
    if (data.length > 0) {
      if(data[0].studentOutTime != undefined){
        await newRequestModel.findByIdAndUpdate(
          id,
          {
            studentInTime: new Date().toLocaleString(),
            security: userId,
            status: "completed",
          },
          { new: true }
        )
        .then(() => {
          return res.json({ message: "In Time Registered", success: true });
        })
        .catch((error) => {
          return res.json({ message: error.message, success: false });
        });
      }
      else{
        return res.json({message : "First OutTime Register..!!", success : false})
      }
    }
  });
 
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
}


const securityData = async (req, res) => {
  const userId = req.params.user;
  try {
    await securityModel.find({ _id: userId }).then((data) => {
      return res.status(200).json({ message: "Ok", data, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

module.exports = { securityData, finishedPasses, updateOutTmePass, updateInTimePass };
