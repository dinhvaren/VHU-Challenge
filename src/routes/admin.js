const express = require("express");
const router = express.Router();
const { AdminController } = require("../app/controller/index");

router.get("/", AdminController.dashboard);
router.get("/users", AdminController.listUsers);
router.get("/teams", AdminController.listTeams);
router.get("/challenges", AdminController.listChallenges);
router.post("/challenges", AdminController.addChallenge);
router.get("/leaderboard", AdminController.leaderboard);

module.exports = router;