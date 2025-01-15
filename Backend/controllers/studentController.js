const Student = require("../models/studentModel");

// Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error adding student" });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Student updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error updating student" });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting student" });
  }
};
