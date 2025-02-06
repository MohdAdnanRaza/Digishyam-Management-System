const Client = require("../models/clientModel");

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients" });
  }
};

// Add a new client

exports.addClient = async (req, res) => {
  try {
    console.log("Received Data:", req.body); //
    const {
      name,
      mobile,
      email,
      company,
      service,
      totalAmount,
      paidAmount,
      dueAmount,
      status,
    } = req.body;

    const client = new Client({
      name,
      mobile,
      email,
      company,
      service,
      totalAmount,
      paidAmount,
      dueAmount: dueAmount || totalAmount - paidAmount,
      status: status || "Active",
    });

    await client.save();
    res.status(201).json({ message: "Client added successfully!", client });
  } catch (error) {
    res.status(400).json({ message: "Error adding client", error });
  }
};
// Update a client
exports.updateClient = async (req, res) => {
  try {
    await Client.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Client updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error updating client" });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting client" });
  }
};
