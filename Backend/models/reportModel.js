const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  projectId: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  attachments: [{ type: String }], // Stores file paths
});

module.exports = mongoose.model("Report", reportSchema);
