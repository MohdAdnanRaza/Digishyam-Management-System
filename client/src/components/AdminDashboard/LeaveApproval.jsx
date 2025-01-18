import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const LeaveApproval = () => {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leavesPerPage] = useState(5);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/leave/");
        if (response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, status) => {
    try {
      const response = await axios.put(
        "http://localhost:4000/api/leave/update-status",
        { leaveId, status }
      );
      if (response.data.success) {
        setLeaves((prevLeaves) =>
          prevLeaves.map((leave) =>
            leave._id === leaveId ? { ...leave, status } : leave
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Calculate days between dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  // Filter leaves by status and name
  const filteredLeaves = leaves
    .filter((leave) => leave.status === filter)
    .filter((leave) =>
      leave.userId?.name?.toLowerCase().includes(searchName.toLowerCase())
    );

  // Pagination logic
  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = filteredLeaves.slice(
    indexOfFirstLeave,
    indexOfLastLeave
  );

  const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);

  return (
    <div style={{ position: "absolute", top: "-1150%", left: "-817%" }}>
      <AdminNavbar />
      <div className="w-full p-6">
        {/* Top Section */}
        <div className="p-6 w-full bg-gray-200 rounded shadow-md -ml-5">
          <h1 className="text-xl font-bold text-gray-700">
            Welcome to Leave Approval
          </h1>
          <p className="text-gray-600">Manage leave requests efficiently</p>
        </div>

        {/* Filter Section */}
        <header className="mt-6 mb-6 ">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-700">
              Leave Approval
            </h3>
          </div>
          <div className="flex justify-end mt-4 ml-3 ">
            {["Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 mx-1 rounded shadow-sm text-white ${
                  filter === status ? "bg-blue-600" : "bg-gray-400"
                }`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between -mt-10">
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 border rounded"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
        </header>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {currentLeaves.length === 0 ? (
            <p className="text-center text-gray-500">No leave records found.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-500 border border-gray-300">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-3 border-b">SNo</th>
                  <th className="px-4 py-3 border-b">Employee</th>
                  <th className="px-4 py-3 border-b">Leave Type</th>
                  <th className="px-4 py-3 border-b">From</th>
                  <th className="px-4 py-3 border-b">To</th>
                  <th className="px-4 py-3 border-b">Days</th>
                  <th className="px-4 py-3 border-b">Reason</th>
                  <th className="px-4 py-3 border-b">Status</th>
                  <th className="px-4 py-3 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeaves.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className={`bg-white ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 border-b">
                      {indexOfFirstLeave + index + 1}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {leave.userId?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b">{leave.leaveType}</td>
                    <td className="px-4 py-3 border-b">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-b">
                      {calculateDays(leave.startDate, leave.endDate)}
                    </td>
                    <td className="px-4 py-3 border-b">{leave.reason}</td>
                    <td className="px-4 py-3 border-b">{leave.status}</td>
                    <td className="px-4 py-3 border-b">
                      {leave.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            className="px-3 py-1 text-white bg-green-600 rounded"
                            onClick={() =>
                              handleStatusChange(leave._id, "Approved")
                            }
                          >
                            Approve
                          </button>
                          <button
                            className="px-3 py-1 text-white bg-red-600 rounded"
                            onClick={() =>
                              handleStatusChange(leave._id, "Rejected")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === page ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveApproval;
