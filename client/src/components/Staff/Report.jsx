import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  File,
  Paperclip,
  CheckCircle,
  Share2,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import autoTable plugin for table generation
import API_BASE_URL from "../../config";
const Report = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hours: "",
    date: new Date().toISOString().substr(0, 10),
    status: "pending",
    projectId: "",
    priority: "medium",
    attachments: [],
  });
  const [reports, setReports] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const priorityColors = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };
  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/reports`);
      console.log("Fetched Reports:", response.data); // Debugging step
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
    console.log("Reports State:", reports); // Debugging step
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachments") {
      setFormData((prev) => ({
        ...prev,
        attachments: Array.from(files),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Create a FormData object to handle file uploads
      const data = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        if (key !== "attachments") {
          data.append(key, formData[key]);
        }
      });

      // Append attachments
      formData.attachments.forEach((file) => {
        data.append("attachments", file);
      });

      // Send the report to the backend
      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to submit report");
      }

      setIsSuccess(true);
      setFormData({
        title: "",
        description: "",
        hours: "",
        date: new Date().toISOString().substr(0, 10),
        status: "pending",
        projectId: "",
        priority: "medium",
        attachments: [],
      });

      // Reset form file inputs
      if (formRef.current) {
        const fileInput = formRef.current.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      }

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportTableToCSV = () => {
    const headers = [
      "Title",
      "Date",
      "Hours",
      "Project",
      "Priority",
      "Description",
    ];
    const csvRows = [headers.join(",")];

    reports.forEach((report) => {
      const projectName =
        projects.find((p) => p.id === report.projectId)?.name || "";
      const values = [
        report.title,
        report.date,
        report.hours,
        projectName,
        report.priority,
        report.description,
      ].map((value) => `"${String(value).replace(/"/g, '""')}"`);
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "work_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTableToPDF = () => {
    const doc = new jsPDF();
    doc.text("Work Reports", 20, 10);

    const tableColumn = [
      "Title",
      "Date",
      "Hours",
      "Client",
      "Priority",
      "Description",
    ];
    const tableRows = reports.map((report) => [
      report.title,
      report.date,
      report.hours,
      report.projectId,
      report.priority,
      report.description,
    ]);

    console.log("jsPDF Object:", doc);
    // Check if autoTable function exists
    if (typeof doc.autoTable !== "function") {
      console.error(
        "autoTable function not found. Ensure jspdf-autotable is correctly imported."
      );
      return;
    }
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("work_reports.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-indigo-100 p-2 rounded-full mr-3">
            <File className="h-6 w-6 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Submit Work Report
          </h2>
        </div>

        {Object.values(formData).some(
          (value) => value && (Array.isArray(value) ? value.length > 0 : true)
        ) && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Export</span>
            </button>

            {showExportOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={exportTableToCSV}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export as CSV
                  </button>
                  <button
                    onClick={exportTableToPDF}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center shadow-sm">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Report submitted successfully!</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 shadow-sm">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Brief title for your work"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-indigo-500" />
                <span>Date</span>
              </div>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-indigo-500" />
                <span>Work Hours</span>
              </div>
            </label>
            <input
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              required
              min="0.5"
              step="0.5"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              placeholder="8"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <input
              type="text"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              placeholder="Enter client name "
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <div className="flex space-x-4 mt-2">
              {["low", "medium", "high"].map((priority) => (
                <label
                  key={priority}
                  className={`flex items-center cursor-pointer px-3 py-2 rounded-md border ${
                    formData.priority === priority
                      ? priorityColors[priority]
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm capitalize">{priority}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Work Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Describe the work you completed..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center">
              <Paperclip className="h-4 w-4 mr-1 text-indigo-500" />
              <span>Attachments (optional)</span>
            </div>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mt-1 text-center hover:border-indigo-500 transition-colors">
            <input
              type="file"
              name="attachments"
              onChange={handleChange}
              multiple
              className="w-full opacity-0 absolute inset-0 cursor-pointer"
              style={{ height: "100px" }}
            />
            <div className="text-gray-600">
              <Download className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-1">
                You can upload multiple files (max 5MB each)
              </p>
            </div>
          </div>
          {formData.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {formData.attachments.length} file(s) selected
              </p>
              <ul className="text-xs text-gray-500 mt-1 list-disc pl-5">
                {Array.from(formData.attachments).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Work Reports</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Hours</th>
              <th className="border border-gray-300 px-4 py-2">Client</th>
              <th className="border border-gray-300 px-4 py-2">Priority</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="border border-gray-300 px-4 py-2">
                  {report.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.hours}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.projectId}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-center ${
                    priorityColors[report.priority]
                  }`}
                >
                  {report.priority.charAt(0).toUpperCase() +
                    report.priority.slice(1)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {report.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={exportTableToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Export CSV
          </button>
          <button
            onClick={exportTableToPDF}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
