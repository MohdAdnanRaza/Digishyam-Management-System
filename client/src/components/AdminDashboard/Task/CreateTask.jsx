import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../../config";
const CreateTask = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [isAssigningTask, setIsAssigningTask] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    date: "",
    priority: "NORMAL",
  });

  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/team`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  // Create a new task
  const createTask = async () => {
    if (!taskForm.title || !taskForm.date) {
      alert("Title and Date are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tasks`, taskForm);
      setTasks((prev) => [...prev, response.data]);
      toast.success("Task created successfully!");
      setIsCreatingTask(false);
      setTaskForm({ title: "", description: "", date: "", priority: "NORMAL" });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  // Assign task to employee
  const assignTask = async () => {
    if (!selectedTask || !selectedEmployee) {
      alert("Please select both a task and an employee.");
      return;
    }

    setIsAssigning(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/tasks/assign/${selectedTask}`,
        {
          userId: selectedEmployee,
        }
      );
      toast.success("Task assigned successfully!");

      // After successful assignment, re-fetch the tasks to update the list
      fetchTasks();

      setSelectedTask("");
      setSelectedEmployee("");
    } catch (error) {
      console.error("Error assigning task:", error);
      toast.error("Failed to assign task. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
    fetchEmployees(); // Fetch employees on component mount
  }, []);

  return (
    <div style={{ position: "absolute", top: "-1150%", left: "-817%" }}>
      <AdminNavbar />
      <ToastContainer />
      <div className="min-h-screen min-w-screen bg-gray-100 p-6 flex flex-col items-center -ml-5">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Task Management
        </h1>

        <div className="w-full flex justify-end mb-6">
          {/* Create Task Button */}
          <button
            onClick={() => setIsCreatingTask(!isCreatingTask)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            {isCreatingTask ? "Close Create Task Form" : "Create Task"}
          </button>
          {/* Assign Task Button */}
          <button
            onClick={() => setIsAssigningTask(!isAssigningTask)}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isAssigningTask ? "Close Assign Task Form" : "Assign Task"}
          </button>
        </div>

        {/* Create Task Form Modal */}
        {isCreatingTask && (
          <div className="absolute top-26 bg-white shadow-md rounded-lg p-6 w-full max-w-lg z-50">
            <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              placeholder="Task Description"
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            ></textarea>
            <input
              type="date"
              value={taskForm.date}
              onChange={(e) =>
                setTaskForm({ ...taskForm, date: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <select
              value={taskForm.priority}
              onChange={(e) =>
                setTaskForm({ ...taskForm, priority: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="NORMAL">NORMAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
            <button
              onClick={createTask}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Create Task
            </button>
          </div>
        )}

        {/* Assign Task Form Modal */}
        {isAssigningTask && (
          <div className="absolute top-26 bg-white shadow-md rounded-lg p-6 w-full max-w-lg z-50">
            <h2 className="text-xl font-semibold mb-4">
              Assign Task to Employee
            </h2>
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">-- Select a Task --</option>
              {tasks.map((task) => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            >
              <option value="">-- Select an Employee --</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button
              onClick={assignTask}
              disabled={isAssigning}
              className={`w-full px-4 py-2 text-white rounded ${
                isAssigning ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {isAssigning ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        )}

        {/* Task List Table */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-7xl mb-6 pt-26">
          <h2 className="text-xl font-semibold mb-4">Task List</h2>
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className=" bg-blue-700">
                <th className="py-2 px-4 border border-gray-300 ">S.No</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Priority</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Stage</th>
                <th className="border border-gray-300 px-4 py-2">
                  Assigned To
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.priority}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(task.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.stage}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.team.length > 0
                      ? task.team.map((employee) => (
                          <span key={employee._id}>
                            {employee.name || "Unknown"}
                          </span>
                        ))
                      : "Not Assigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
