const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

// Create Task
router.post("/", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Assign Task to Employee
router.put("/assign/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (!task.team.includes(userId)) {
      task.team.push(userId); // Assign employee to task
      await task.save();
    }

    const updatedTask = await Task.findById(taskId).populate("team", "name");
    //console.log(updatedTask);
    res.status(200).json(updatedTask); // Return the updated task with employee names
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all Tasks
// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("team", "name");
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Get tasks assigned to a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ team: userId }); // Filter tasks where userId is in the team array
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
