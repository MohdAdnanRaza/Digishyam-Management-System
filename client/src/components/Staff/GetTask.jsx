import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/ContextProvider"; // Ensure this provides the `user` object
import {
  Card,
  CardContent,
  Chip,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { CalendarToday, AccessTime, MoreHoriz } from "@mui/icons-material";

const GetTask = () => {
  const [tasks, setTasks] = useState([]);
  const [descriptionVisible, setDescriptionVisible] = useState({}); // State to track visibility of each task's description
  const { user } = useAuth(); // Access user from context

  // Fetch tasks assigned to the logged-in employee
  const fetchTasks = async () => {
    if (!user || !user._id) {
      console.error("User ID is not provided");
      return; // Prevent API call if userId is undefined
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/tasks/user/${user._id}` // Use the correct route
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]); // Re-run the effect when user changes

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getStatusColor = (stage) => {
    switch (stage?.toUpperCase()) {
      case "TODO":
        return "warning";
      case "IN PROGRESS":
        return "primary";
      case "COMPLETED":
        return "success";
      default:
        return "default";
    }
  };

  const toggleDescription = (taskId) => {
    setDescriptionVisible((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const updateTaskStatus = async (taskId, currentStage) => {
    // Determine the next stage
    const nextStage =
      currentStage === "TODO"
        ? "IN PROGRESS"
        : currentStage === "IN PROGRESS"
        ? "COMPLETED"
        : "TODO";

    try {
      // Send the update request to the backend
      const response = await axios.put(
        `http://localhost:4000/api/tasks/${taskId}/stage`,
        { stage: nextStage }
      );

      // Update the local tasks state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, stage: response.data.stage } : task
        )
      );
      toast.success(`Task moved to ${nextStage}`);
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "10px", my: "20%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task._id || task.title}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: "12px",
                backgroundColor: "rgba(240, 248, 255, 1)",
                transition: "transform 0.2s ease, background-color 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "rgba(0, 123, 255, 0.1)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ color: "#000000" }}>
                      {task.title || "Untitled Task"}
                    </Typography>

                    <IconButton
                      onClick={() => toggleDescription(task._id)}
                      size="small"
                      sx={{
                        ml: 2,
                        transform: "rotate(90deg)",
                      }}
                    >
                      <MoreHoriz />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    <Chip
                      label={task.priority || "N/A"}
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                    <Chip
                      label={task.stage || "N/A"}
                      color={getStatusColor(task.stage)}
                      size="small"
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    mt: 2,
                    color: "text.secondary",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" />
                    <Typography variant="body2">
                      Due:{" "}
                      {task.date
                        ? new Date(task.date).toLocaleDateString()
                        : "No due date"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      Assigned by: {task.assignedBy || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                {descriptionVisible[task._id] && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {task.description || "No description available"}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color={getStatusColor(task.stage)}
                  onClick={() => updateTaskStatus(task._id, task.stage)}
                  sx={{ mt: 2 }}
                >
                  {task.stage === "TODO"
                    ? "Start Task"
                    : task.stage === "IN PROGRESS"
                    ? "Complete Task"
                    : "Reset to TODO"}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>No tasks assigned to you yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default GetTask;
