const studentModel = require("../../Model/Schema/studentModel");

const getStudentList = async (req, res) => {
  try {
    await studentModel.find().then((users) => {
      return res.json({ message: "Student details", users, success: true });
    });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const updateStudent = async (req, res) => {
  const _id = req.params;
  const {
    RegisterNumber,
    name,
    Email,
    year,
    ParentNumber,
    District,
    Department,
    Gender,
    PhoneNumber,
  } = req.body;
  try {
    await studentModel
      .find({ $and: [{ Email }, { RegisterNumber }] })
      .then(async (data) => {
        if (data.length > 0) {
          return res.json({
            message: "Register Number or Email Already Used",
            success: false,
          });
        } else {
          await studentModel
            .findByIdAndUpdate(_id, {
              RegisterNumber,
              name,
              Email,
              year,
              ParentNumber,
              District,
              Department,
              Gender,
              PhoneNumber,
            })
            .then((data) => {
              return res.json({
                message: "Student details updated successfully",
                success: true,
              });
            })
            .catch((error) => {
              return res.json({ message: error.message, success: false });
            });
        }
      });
  } catch (error) {
    return res.json({ message: error.message, success: false });
  }
};

const deleteStudent = async (req, res) => {
  const _id = req.params;
  try {
    await studentModel
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

module.exports = { getStudentList, updateStudent, deleteStudent };
