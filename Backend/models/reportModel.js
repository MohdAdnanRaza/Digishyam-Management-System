const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  projectId: { type: String, required: true },
  attachments: [{ type: String }], // Stores file paths
});

module.exports = mongoose.model("Report", reportSchema);
