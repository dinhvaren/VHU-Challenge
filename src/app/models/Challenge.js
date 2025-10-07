const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title:       { type: String, required: true, unique: true },
  category:    { type: String, enum: ["Web", "Crypto", "Forensics", "Pwn", "Misc"], required: true },
  points:      { type: Number, required: true },
  difficulty:  { type: String, enum: ["Easy", "Medium", "Hard"], default: "Easy" },
  description: { type: String, required: true },
  attachments: [{ type: String }], // link đến file hoặc resource
  flag:        { type: String, required: true }, // flag thật, được hash SHA256 trong môi trường production
  status:      { type: String, enum: ["Active", "Draft"], default: "Active" },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Challenge", challengeSchema);
