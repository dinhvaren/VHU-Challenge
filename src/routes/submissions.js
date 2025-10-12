const express = require("express");
const router = express.Router();
const { SubmissionController } = require("../app/controller/index");

// Admin
router.get("/", SubmissionController.getAll);
router.get("/:id", SubmissionController.getById);
router.delete("/:id", SubmissionController.delete);

// User
router.post("/", SubmissionController.submitFlag);
router.get("/user/:userId", SubmissionController.getByUser);
router.get("/team/:teamId", SubmissionController.getByTeam);

module.exports = router;
