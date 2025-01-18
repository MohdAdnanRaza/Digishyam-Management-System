const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  service: { type: String, required: true },
});

module.exports = mongoose.model("Client", clientSchema);
