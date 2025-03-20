const express = require("express");
const {
  createReport,
  getReports,
  getReportById,
  deleteReport,
} = require("../controllers/reportController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Upload up to 5 attachments per report
router.post("/", upload.array("attachments", 5), createReport);
router.get("/", getReports);
router.get("/:id", getReportById);
router.delete("/:id", deleteReport);

module.exports = router;
