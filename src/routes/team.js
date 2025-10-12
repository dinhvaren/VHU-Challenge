const express = require("express");
const router = express.Router();
const { TeamController } = require("../app/controller/index");

router.get("/", TeamController.getAllTeams);
router.get("/leaderboard", TeamController.getLeaderboard);
router.get("/:id", TeamController.getTeamById);
router.post("/", TeamController.createTeam);
router.put("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);
router.patch("/:id/add-member", TeamController.addMember);
router.patch("/:id/remove-member", TeamController.removeMember);

module.exports = router;
