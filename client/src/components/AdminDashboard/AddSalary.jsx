import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../config";

const AddSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [salariesPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterMonth, setFilterMonth] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [totalSalaryAmount, setTotalSalaryAmount] = useState(0); // ✅ New state
  const [salary, setSalary] = useState({
    employeeName: "",
    designation: "",
    payAmount: "",
    dueAmount: "",
    salaryDate: "",
  });

  const designations = [
    "Digital Marketer",
    "Software Developer",
    "Graphic Designer",
    "SEO",
    "HR",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/salary?month=${filterMonth}`
        );
        if (response.data && Array.isArray(response.data.salaries)) {
          let filtered = response.data.salaries;

          if (durationFilter) {
            const currentDate = new Date();
            const monthsAgo = new Date();
            monthsAgo.setMonth(
              currentDate.getMonth() - parseInt(durationFilter)
            );

            filtered = filtered.filter((salary) => {
              const salaryDate = new Date(salary.salaryDate);
              return salaryDate >= monthsAgo && salaryDate <= currentDate;
            });
          }

          setSalaries(filtered);

          // ✅ Calculate total salary
          const total = filtered.reduce(
            (sum, item) => sum + Number(item.payAmount || 0),
            0
          );
          setTotalSalaryAmount(total);
        } else {
          toast.error("Invalid salary data format!");
        }
      } catch (error) {
        toast.error("Error fetching salaries!");
        console.error("Error fetching salaries:", error);
      }
    };

    fetchSalaries();
  }, [filterMonth, durationFilter]);

  const indexOfLastSalary = currentPage * salariesPerPage;
  const indexOfFirstSalary = indexOfLastSalary - salariesPerPage;

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
        `${API_BASE_URL}/api/salary/add`,
        salary
      );
      setSalaries([...salaries, response.data.salary]);
      setIsModalOpen(false);
      setSalary({
        employeeName: "",
        designation: "",
        payAmount: "",
        dueAmount: "",
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

        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Employee Name"
            className="p-2 border rounded-md"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          <select
            className="p-2 border rounded-md"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-md"
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
          >
            <option value="">All Durations</option>
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
          >
            Add Salary
          </button>
        </div>

        {/* ✅ Total Salary Amount Display */}
        {durationFilter && (
          <div className="text-lg font-semibold text-teal-700 mb-4">
            Total Salary Amount (Last {durationFilter} Months): ₹
            {totalSalaryAmount}
          </div>
        )}

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="py-2 px-4 border">S.No</th>
              <th className="py-2 px-4 border">Employee Name</th>
              <th className="py-2 px-4 border">Designation</th>
              <th className="py-2 px-4 border">Salary Amount</th>
              <th className="py-2 px-4 border">Due Amount</th>
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
                <td className="py-2 px-4 border">{salary?.dueAmount}</td>
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
      </div>
    </div>
  );
};

export default AddSalary;
