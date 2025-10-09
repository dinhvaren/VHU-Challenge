const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user" },

  team:     { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  score:    { type: Number, default: 0 },
  solved:   [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],

  status:   { type: String, enum: ["active", "pending", "banned"], default: "active" },
  lastLogin:{ type: Date, default: Date.now },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
