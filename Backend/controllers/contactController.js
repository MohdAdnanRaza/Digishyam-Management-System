const Contact = require("../models/contactModel");

// Create a new contact form submission
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

 // Send notification with full details
 global.notifications.push({
  name,
  email,
  phone,
  message,
  createdAt: new Date(),
});

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit form" });
  }
};

// Get all contact form submissions (notifications)
exports.getNotifications = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
