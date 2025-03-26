const Report = require("../models/reportModel");

// @desc Create a new report
// @route POST /api/reports
exports.createReport = async (req, res) => {
  try {
    const { title, description, date, projectId } = req.body;
    const attachments = req.files ? req.files.map((file) => file.path) : [];

    const report = new Report({
      title,
      description,
      date,
      projectId,
      attachments,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error });
  }
};

// @desc Get all reports
// @route GET /api/reports
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

// @desc Get a single report
// @route GET /api/reports/:id
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching report", error });
  }
};

// @desc Delete a report
// @route DELETE /api/reports/:id
exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report", error });
  }
};
