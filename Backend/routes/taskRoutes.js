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

// Get Tasks for specific user

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ team: userId }); // Filter tasks where userId is in the team array
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("team", "name"); // Optionally populate team details
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/summary", async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ stage: "completed" });
    const inProgressTasks = await Task.countDocuments({ stage: "inProgress" });
    const todoTasks = await Task.countDocuments({ stage: "todo" });

    res.status(200).json({
      totalTasks,
      completed: completedTasks,
      inProgress: inProgressTasks,
      todo: todoTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.put("/:taskId", async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     const { stage } = req.body;

//     const task = await Task.findByIdAndUpdate(taskId, { stage }, { new: true });

//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.put("/:taskId/stage", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { stage } = req.body;

    if (!["TODO", "IN PROGRESS", "COMPLETED"].includes(stage)) {
      return res.status(400).json({ message: "Invalid stage value" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { stage },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
