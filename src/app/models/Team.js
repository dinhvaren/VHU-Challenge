const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name:       { type: String, required: true, unique: true },
  teamId:     { type: String, unique: true }, // ví dụ: T001, T002
  members:    [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  score:      { type: Number, default: 0 },
  status:     { type: String, enum: ["active", "pending"], default: "active" },
  createdAt:  { type: Date, default: Date.now },
});

module.exports = mongoose.model("Team", teamSchema);
