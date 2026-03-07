const studentModel = require("../../Model/Schema/studentModel");

const getStudentList = async (req, res) => {
  try {
    const { searchQuery, dateQuery, yearQuery, page = 1, limit = 10 } = req.query;
    
    const query = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { Email: { $regex: searchQuery, $options: "i" } },
        { District: { $regex: searchQuery, $options: "i" } },
        { Department: { $regex: searchQuery, $options: "i" } }
      ];
      
      const parsedNum = Number(searchQuery);
      if (!isNaN(parsedNum) && searchQuery.trim() !== "") {
        query.$or.push({ RegisterNumber: parsedNum });
        query.$or.push({ PhoneNumber: parsedNum });
      } else {
        query.$or.push({ $expr: { $regexMatch: { input: { $toString: "$RegisterNumber" }, regex: searchQuery, options: "i" } } });
        query.$or.push({ $expr: { $regexMatch: { input: { $toString: "$PhoneNumber" }, regex: searchQuery, options: "i" } } });
      }
    }

    if (yearQuery) {
      query.year = Number(yearQuery);
    }

    if (dateQuery) {
        const start = new Date(dateQuery);
        const end = new Date(dateQuery);
        end.setHours(23, 59, 59, 999);
        query.createdAt = {
          $gte: start,
          $lte: end
        };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const isQueryEmpty = Object.keys(query).length === 0;

    const [users, total] = await Promise.all([
      studentModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      isQueryEmpty ? studentModel.estimatedDocumentCount() : studentModel.countDocuments(query)
    ]);

    return res.json({ 
      message: "Student details", 
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
