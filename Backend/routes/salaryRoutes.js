const express = require("express");
const router = express.Router();
const { addSalary, getSalary } = require("../controllers/salaryController");

router.post("/add", addSalary);
router.get("/", getSalary);

module.exports = router;
