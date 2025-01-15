const Salary = require("../models/salaryModel"); // Assuming a salary model exists

const addSalary = async (req, res) => {
  try {
    const { employeeName, designation, payAmount, salaryDate } = req.body;

    if (!employeeName || !designation || !payAmount || !salaryDate) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const newSalary = new Salary({
      employeeName,
      designation,
      payAmount,
      salaryDate,
    });

    await newSalary.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding salary:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
const getSalary = async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ salaryDate: -1 }); // Sort by most recent salary
    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
module.exports = { addSalary, getSalary };
