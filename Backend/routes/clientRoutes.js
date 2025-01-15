const express = require("express");
const {
  getClients,
  addClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const router = express.Router();

router.get("/", getClients); // Get all clients
router.post("/", addClient); // Add a new client
router.put("/:id", updateClient); // Update a client
router.delete("/:id", deleteClient); // Delete a client

module.exports = router;
