const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST route to submit the contact form
router.post("/submit", contactController.createContact);

// GET route to fetch all notifications
router.get("/notifications", contactController.getNotifications);

module.exports = router;
