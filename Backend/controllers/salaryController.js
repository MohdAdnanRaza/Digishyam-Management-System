const Salary = require("../models/salaryModel"); // Assuming a salary model exists

const addSalary = async (req, res) => {
  try {
    const { employeeName, designation, payAmount, dueAmount, salaryDate } =
      req.body;

    if (
      !employeeName ||
      !designation ||
      !payAmount ||
      !salaryDate ||
      !dueAmount
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const newSalary = new Salary({
      employeeName,
      designation,
      payAmount,
      dueAmount,
      salaryDate,
    });

    await newSalary.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding salary:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
// const getSalary = async (req, res) => {
//   try {
//     const salaries = await Salary.find().sort({ salaryDate: -1 }); // Sort by most recent salary
//     return res.status(200).json({ success: true, salaries });
//   } catch (error) {
//     console.error("Error fetching salaries:", error);
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };
// const getSalary = async (req, res) => {
//   try {
//     const { month } = req.query; // Expecting the month as a query parameter (e.g., ?month=1 for January)

//     let filter = {};
//     if (month) {
//       const startDate = new Date(new Date().getFullYear(), month - 1, 1);
//       const endDate = new Date(new Date().getFullYear(), month, 0); // Last day of the month
//       filter.salaryDate = { $gte: startDate, $lte: endDate };
//     }

//     const salaries = await Salary.find(filter).sort({ salaryDate: -1 });
//     return res.status(200).json({ success: true, salaries });
//   } catch (error) {
//     console.error("Error fetching salaries:", error);
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };
const getSalary = async (req, res) => {
  try {
    const { month } = req.query; // Example: ?month=1 for January

    let filter = {};
    if (month) {
      const year = new Date().getFullYear();
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); // Last day of the month
      filter.salaryDate = { $gte: startDate, $lte: endDate };
    }

    const salaries = await Salary.find(filter).sort({ salaryDate: -1 });
    res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
module.exports = { addSalary, getSalary };
