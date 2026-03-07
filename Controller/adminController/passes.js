const newRequestModel = require("../../Model/Schema/newRequestModel");

const getPass = async (req, res) => {
    try {
      const { searchQuery, startDateQuery, endDateQuery, yearQuery, departmentQuery, page = 1, limit = 10 } = req.query;
      
      const query = {};

      if (searchQuery) {
        query.$or = [
          { name: { $regex: searchQuery, $options: "i" } },
          { Destination: { $regex: searchQuery, $options: "i" } },
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

      if (departmentQuery) {
        // Dropdown exact match instead of slow regex
        query.Department = departmentQuery; 
      }

      if (startDateQuery && endDateQuery) {
        query.createdAt = {
          $gte: new Date(startDateQuery),
          $lte: new Date(new Date(endDateQuery).setHours(23, 59, 59, 999))
        };
      } else if (startDateQuery) {
        const start = new Date(startDateQuery);
        const end = new Date(startDateQuery);
        end.setHours(23, 59, 59, 999);
        query.createdAt = {
          $gte: start,
          $lte: end
        };
      }

      const skip = (Number(page) - 1) * Number(limit);

      const isQueryEmpty = Object.keys(query).length === 0;

      const [users, total] = await Promise.all([
        newRequestModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
        isQueryEmpty ? newRequestModel.estimatedDocumentCount() : newRequestModel.countDocuments(query)
      ]);

      return res.json({ 
        message: "Passes details", 
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