const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  stage: {
    type: String,
    enum: ["TODO", "IN PROGRESS", "COMPLETED"],
    default: "TODO",
  },
  priority: {
    type: String,
    enum: ["HIGH", "MEDIUM", "NORMAL", "LOW"],
    default: "NORMAL",
  },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], // Employee IDs
  assets: [{ type: String }], // URLs for uploaded files
});

module.exports = mongoose.model("Task", TaskSchema);
