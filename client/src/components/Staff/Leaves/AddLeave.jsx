import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/ContextProvider"; // Ensure this provides the `user` object
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLeave = () => {
  const { user } = useAuth(); // Retrieve the user object from context
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Update leave state when user changes
  useEffect(() => {
    if (user && user.id) {
      setLeave((prevState) => ({
        ...prevState,
        userId: user.id, // Use the correct property from the user object
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast("User not logged in. Please log in to continue.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token is missing or expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/leave/add",
        leave, // Pass the updated leave object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Leave added successfully!");
        setTimeout(() => navigate("/staff/leave"), 2000);
      } else {
        toast.error(response.data.error || "Failed to add leave.");
      }
    } catch (error) {
      console.error("Error adding leave:", error);
      toast.error(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="max-w-6xl mx-60 mt-16 bg-white p-8 rounded-md shadow-md absolute top-12 left-16">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={leave.leaveType}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* From Date and To Date */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={leave.startDate}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                value={leave.endDate}
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              name="reason"
              placeholder="Reason"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              value={leave.reason}
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Add Leave
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddLeave;
