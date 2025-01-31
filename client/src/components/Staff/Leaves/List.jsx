import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/ContextProvider"; // Assuming this context provides the logged-in user information
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../../config";
const List = () => {
  const { user } = useAuth(); // Get user object from context
  const [leaves, setLeaves] = useState([]); // State to store leaves
  const [error, setError] = useState(""); // State to store error message
  const [search, setSearch] = useState(""); // State to store search term
  const navigate = useNavigate();

  // Fetch leaves on component mount or when user changes
  useEffect(() => {
    if (user && user.id) {
      const fetchLeaves = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("Token is missing or expired. Please log in again.");
            navigate("/login");
            return;
          }

          const response = await axios.get(
            `${API_BASE_URL}/api/leave/${user.id}`, // Fetch leaves for the logged-in user
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setLeaves(response.data.leaves);
          } else {
            setError(response.data.error || "Failed to fetch leaves.");
          }
        } catch (err) {
          setError("An error occurred while fetching leaves.");
          console.error(err);
        }
      };

      fetchLeaves();
    }
  }, [user, navigate]);

  const filteredLeaves = leaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(search.toLowerCase())
  );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 mx-9 my-12 w-full">
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar (Left Side) */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search By Leave Type"
            className="px-4 py-0.5 border w-auto mt-16 -ml-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Heading (Center) */}
        <h3 className="text-2xl font-bold text-center flex-1">Manage Leaves</h3>

        {/* "Add New Leave" Link (Right Side) */}
        <Link
          to="add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ml-8 mt-12"
        >
          Add New Leave
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {filteredLeaves.length === 0 ? (
        <p>No leave records found.</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 -ml-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNo</th>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Applied Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave, index) => (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">
                  {new Date(leave.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
