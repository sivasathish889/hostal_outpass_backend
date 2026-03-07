const newRequestModel = require("../../Model/Schema/newRequestModel");
const studentModel = require("../../Model/Schema/studentModel");

// Helper to calculate percentage change
const calculatePercentageHelper = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  const change = ((current - previous) / previous) * 100;
  return Number(change.toFixed(1));
};

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);

    const [
      totalStudents,
      activePasses,
      approvedToday,
      pendingReview,
      recentActivity,
      studentsThisMonth,
      studentsLastMonth,
      passesThisMonth,
      passesLastMonth,
      approvedThisMonth,
      approvedLastMonth,
      pendingThisMonth,
      pendingLastMonth
    ] = await Promise.all([
      studentModel.estimatedDocumentCount(),
      newRequestModel.countDocuments({ status: "2" }),
      newRequestModel.countDocuments({ status: "2", updatedAt: { $gte: today } }),
      newRequestModel.countDocuments({ status: "1" }),
      newRequestModel.find().sort({ createdAt: -1 }).limit(4).lean(),
      studentModel.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      studentModel.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      newRequestModel.countDocuments({ createdAt: { $gte: startOfCurrentMonth } }),
      newRequestModel.countDocuments({ createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      newRequestModel.countDocuments({ status: "2", updatedAt: { $gte: startOfCurrentMonth } }),
      newRequestModel.countDocuments({ status: "2", updatedAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } }),
      newRequestModel.countDocuments({ status: "1", createdAt: { $gte: startOfCurrentMonth } }),
      newRequestModel.countDocuments({ status: "1", createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } })
    ]);

    const trends = {
      totalStudents: calculatePercentageHelper(studentsThisMonth, studentsLastMonth),
      activePasses: calculatePercentageHelper(passesThisMonth, passesLastMonth),
      approvedToday: calculatePercentageHelper(approvedThisMonth, approvedLastMonth),
      pendingReview: calculatePercentageHelper(pendingThisMonth, pendingLastMonth)
    };

    return res.json({
      success: true,
      stats: {
        totalStudents,
        activePasses,
        approvedToday,
        pendingReview,
      },
      trends,
      recentActivity,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
