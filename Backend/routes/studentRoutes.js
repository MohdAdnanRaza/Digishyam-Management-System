const express = require("express");
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", getStudents); // Get all students
router.post("/", addStudent); // Add a new student
router.put("/:id", updateStudent); // Update a student
router.delete("/:id", deleteStudent); // Delete a student

module.exports = router;
