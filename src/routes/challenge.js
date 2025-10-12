const express = require("express");
const router = express.Router();
const { ChallengeController } = require("../app/controller/index");

// Public
router.get("/", ChallengeController.getAll);
router.get("/:id", ChallengeController.getById);
router.post("/:id/check", ChallengeController.checkFlag);

// Admin
router.post("/", ChallengeController.create);
router.put("/:id", ChallengeController.update);
router.delete("/:id", ChallengeController.delete);

module.exports = router;
