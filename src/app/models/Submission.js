const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  team:      { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
  flag:      { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  submittedAt: { type: Date, default: Date.now },
  ipAddress:   { type: String }
});

module.exports = mongoose.model("Submission", submissionSchema);
