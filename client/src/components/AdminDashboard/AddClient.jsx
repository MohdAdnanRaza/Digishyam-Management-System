import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../../config";

const AddClient = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const [clients, setClients] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    service: "",
    totalAmount: "",
    paidAmount: "",
    dueAmount: "",
    status: "Active",
    activationDate: new Date().toISOString().split("T")[0],
  });
  const [editingClient, setEditingClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/clients`);
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClient) {
        await axios.put(
          `http://localhost:4000/api/clients/${editingClient._id}`,
          form
        );
        toast.success("Client updated successfully");
      } else {
        await axios.post(`http://localhost:4000/api/clients`, form);
        toast.success("Client added successfully");
      }
      fetchClients();
      setForm({
        name: "",
        mobile: "",
        email: "",
        company: "",
        service: "",
        totalAmount: "",
        paidAmount: "",
        dueAmount: "",
        activationDate: new Date().toISOString().split("T")[0],
        status: "Active",
      });
      setEditingClient(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error saving client");
      console.error("Error saving client:", error);
    }
  };

  const handleEdit = (client) => {
    setForm(client);
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/clients/${id}`);
      toast.success("Client deleted successfully");
      fetchClients();
    } catch (error) {
      toast.error("Error deleting client");
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
      <AdminNavbar />
      <ToastContainer />
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Client Management
        </h2>
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded mb-4 w-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-teal-600 text-white px-4 py-2 rounded ml-[900px] mt-[-40px]"
        >
          Add Client
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
              <h3 className="text-xl font-semibold mb-4">
                {editingClient ? "Edit Client" : "Add Client"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="service"
                    placeholder="Service"
                    value={form.service}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="totalAmount"
                    placeholder="Total Amount"
                    value={form.totalAmount}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="paidAmount"
                    placeholder="Paid Amount"
                    value={form.paidAmount}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="dueAmount"
                    placeholder="Due Amount"
                    value={form.dueAmount}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="date"
                    name="activationDate"
                    value={form.activationDate}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                  />
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    type="submit"
                    className="bg-teal-600 text-white px-4 py-2 rounded"
                  >
                    {editingClient ? "Update Client" : "Add Client"}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="absolute -left-4 overflow-x-auto">
          {/* <table className="w-auto max-w-lg border-collapse bg-white shadow-md rounded-md overflow-hidden text-sm"> */}
          <table className="  w-full max-w-2xl border-collapse bg-white shadow-md rounded-lg overflow-hidden text-base">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="py-1 px-3 border">Name</th>
                <th className="py-1 px-2 border">Mobile</th>
                <th className="py-1 px-2 border">Email</th>
                <th className="py-1 px-8 border">Company</th>
                <th className="py-1 px-2 border">Service</th>
                <th className="py-1 px-2 border">Total</th>
                <th className="py-1 px-2 border">Paid</th>
                <th className="py-1 px-2 border">Due</th>
                <th className="py-1 px-2 border">Activation</th>
                <th className="py-1 px-2 border">Status</th>
                <th className="py-1 px-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients
                .filter((client) =>
                  client.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((client) => (
                  <tr
                    key={client._id}
                    className="border hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-1 px-2 border">{client.name}</td>
                    <td className="py-1 px-2 border">{client.mobile}</td>
                    <td className="py-1 px-2 border">{client.email}</td>
                    <td className="py-1 px-2 border">{client.company}</td>
                    <td className="py-1 px-2 border">{client.service}</td>
                    <td className="py-1 px-2 border">{client.totalAmount}</td>
                    <td className="py-1 px-2 border">{client.paidAmount}</td>
                    <td className="py-1 px-2 border">{client.dueAmount}</td>
                    <td className="py-1 px-2 border">
                      {formatDate(client.activationDate)}
                    </td>
                    <td className="py-1 px-2 border">{client.status}</td>
                    <td className="py-1 px-2 border flex gap-1">
                      <button
                        onClick={() => handleEdit(client)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
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

export default AddClient;
