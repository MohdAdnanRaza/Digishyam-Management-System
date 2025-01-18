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
import {
  CalendarToday,
  AccessTime,
  FilterList,
  MoreHoriz,
} from "@mui/icons-material";

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
        return "warning"; // Yellow color for TODO
      case "IN PROGRESS":
        return "primary"; // Blue color for IN PROGRESS
      case "COMPLETED":
        return "success"; // Green color for COMPLETED
      default:
        return "default"; // Default color for unexpected cases
    }
  };

  const toggleDescription = (taskId) => {
    setDescriptionVisible((prev) => ({
      ...prev,
      [taskId]: !prev[taskId], // Toggle visibility of description
    }));
  };

  return (
    <Box sx={{ p: 4, maxWidth: "800px", mx: "10px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          My Tasks
        </Typography>
        <Button variant="outlined" startIcon={<FilterList />}>
          Filter
        </Button>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task._id || task.title}
              variant="outlined"
              sx={{
                p: 2,
                borderRadius: "12px", // Rounded corners
                backgroundColor: "rgba(240, 248, 255, 1)", // Default light background
                transition: "transform 0.2s ease, background-color 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "rgba(0, 123, 255, 0.1)", // Light blue on hover
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ color: "#000000" }}>
                      {task.title || "Untitled Task"}
                    </Typography>

                    {/* Vertical dots icon aligned to the right */}
                    <IconButton
                      onClick={() => toggleDescription(task._id)}
                      size="small"
                      sx={{
                        ml: 2, // Adds spacing between title and dots
                        transform: "rotate(90deg)", // Rotates the icon to make it vertical
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

                {/* Conditionally render description */}
                {descriptionVisible[task._id] && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {task.description || "No description available"}
                  </Typography>
                )}
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
