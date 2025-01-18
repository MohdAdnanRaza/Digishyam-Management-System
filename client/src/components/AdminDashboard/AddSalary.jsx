import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [salariesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salary, setSalary] = useState({
    employeeName: "",
    designation: "",
    payAmount: "",
    salaryDate: "",
  });

  const designations = [
    "Digital Marketer",
    "Software Developer",
    "Graphic Designer",
    "SEO",
    "HR",
  ];

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/salary");
        if (response.data && Array.isArray(response.data.salaries)) {
          setSalaries(response.data.salaries);
        } else {
          toast.error("Invalid salary data format!");
        }
      } catch (error) {
        toast.error("Error fetching salaries!");
        console.error("Error fetching salaries:", error);
      }
    };
    fetchSalaries();
  }, []);

  const indexOfLastSalary = currentPage * salariesPerPage;
  const indexOfFirstSalary = indexOfLastSalary - salariesPerPage;

  // Safely filter salaries, checking for employeeName before accessing it
  const filteredSalaries = salaries.filter((salary) =>
    salary?.employeeName?.toLowerCase().includes(searchName.toLowerCase())
  );

  const currentSalaries = filteredSalaries.slice(
    indexOfFirstSalary,
    indexOfLastSalary
  );
  const totalPages = Math.ceil(filteredSalaries.length / salariesPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/salary/add",
        salary
      );
      setSalaries([...salaries, response.data.salary]);
      setIsModalOpen(false);
      setSalary({
        employeeName: "",
        designation: "",
        payAmount: "",
        salaryDate: "",
      });
      toast.success("Salary added successfully!");
    } catch (error) {
      toast.error("Error adding salary!");
      console.error("Error adding salary:", error);
    }
  };

  return (
    <div style={{ position: "absolute", top: "-1150%", left: "-817%" }}>
      <AdminNavbar />
      <ToastContainer />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Salary Management
        </h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Employee Name"
            className="p-2 border rounded-md"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
          >
            Add Salary
          </button>
        </div>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-2 px-4 border">S.No</th>
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">Pay Amount</th>
              <th className="py-2 px-4 border">Salary Date</th>
            </tr>
          </thead>
          <tbody>
            {currentSalaries.map((salary, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="py-2 px-4 border">
                  {indexOfFirstSalary + index + 1}
                </td>
                <td className="py-2 px-4 border">{salary?.employeeName}</td>
                <td className="py-2 px-4 border">{salary?.designation}</td>
                <td className="py-2 px-4 border">{salary?.payAmount}</td>
                <td className="py-2 px-4 border">
                  {salary?.salaryDate
                    ? new Date(salary.salaryDate).toLocaleDateString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded-md"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-3 rounded-md"
          >
            Next
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-1/2 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                ×
              </button>
              <h3 className="text-xl font-bold mb-4">Add Salary</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="employeeName"
                  placeholder="Employee Name"
                  className="w-full p-2 border mb-4 rounded-md"
                  value={salary.employeeName}
                  onChange={(e) =>
                    setSalary({ ...salary, employeeName: e.target.value })
                  }
                  required
                />
                <select
                  name="designation"
                  className="w-full p-2 border mb-4 rounded-md"
                  value={salary.designation}
                  onChange={(e) =>
                    setSalary({ ...salary, designation: e.target.value })
                  }
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation, index) => (
                    <option key={index} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="payAmount"
                  placeholder="Pay Amount"
                  className="w-full p-2 border mb-4 rounded-md"
                  value={salary.payAmount}
                  onChange={(e) =>
                    setSalary({ ...salary, payAmount: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  name="salaryDate"
                  className="w-full p-2 border mb-4 rounded-md"
                  value={salary.salaryDate}
                  onChange={(e) =>
                    setSalary({ ...salary, salaryDate: e.target.value })
                  }
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSalary;
