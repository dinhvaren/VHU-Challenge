const { Team, User } = require("../models/index");
const crypto = require("crypto");

class TeamController {
  // [GET] /teams
  async getAllTeams(req, res) {
    try {
      const teams = await Team.find()
        .populate("members", "username email role")
        .sort({ score: -1, createdAt: 1 });

      res.status(200).json({
        message: "Team list retrieved successfully.",
        total: teams.length,
        teams,
      });
    } catch (err) {
      console.error("GetAllTeams Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [GET] /teams/:id
  async getTeamById(req, res) {
    try {
      const { id } = req.params;

      const team = await Team.findById(id)
        .populate("members", "username email score role status")
        .exec();

      if (!team) {
        return res.status(404).json({ message: "Team not found." });
      }

      res.status(200).json({ team });
    } catch (err) {
      console.error("GetTeamById Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [POST] /teams
  async createTeam(req, res) {
    try {
      const { name, members } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Team name is required." });
      }

      const existing = await Team.findOne({ name });
      if (existing) {
        return res.status(400).json({ message: "Team name already exists." });
      }

      const teamId = crypto.randomBytes(4).toString("hex").toUpperCase();

      const team = await Team.create({
        name,
        teamId,
        members: members || [],
      });

      res.status(201).json({
        message: "Team created successfully.",
        team: {
          id: team._id,
          name: team.name,
          teamId: team.teamId,
          members: team.members,
        },
      });
    } catch (err) {
      console.error("CreateTeam Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [PUT] /teams/:id
  async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const { name, status, score, members } = req.body;

      const team = await Team.findById(id);
      if (!team) {
        return res.status(404).json({ message: "Team not found." });
      }

      if (name) team.name = name;
      if (status) team.status = status;
      if (typeof score === "number") team.score = score;
      if (Array.isArray(members)) team.members = members;

      await team.save();

      res.status(200).json({
        message: "Team updated successfully.",
        team,
      });
    } catch (err) {
      console.error("UpdateTeam Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [DELETE] /teams/:id
  async deleteTeam(req, res) {
    try {
      const { id } = req.params;

      const deleted = await Team.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Team not found." });
      }

      await User.updateMany({ team: id }, { $unset: { team: "" } });

      res.status(200).json({ message: "Team deleted successfully." });
    } catch (err) {
      console.error("DeleteTeam Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [PATCH] /teams/:id/add-member
  async addMember(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      const team = await Team.findById(id);
      const user = await User.findById(userId);

      if (!team || !user) {
        return res.status(404).json({ message: "Team or User not found." });
      }

      if (user.team && user.team.toString() !== team._id.toString()) {
        return res.status(400).json({ message: "User already belongs to another team." });
      }

      if (!team.members.includes(userId)) {
        team.members.push(userId);
        await team.save();

        user.team = team._id;
        await user.save();
      }

      res.status(200).json({ message: "Member added successfully.", team });
    } catch (err) {
      console.error("AddMember Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [PATCH] /teams/:id/remove-member
  async removeMember(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      const team = await Team.findById(id);
      if (!team) {
        return res.status(404).json({ message: "Team not found." });
      }

      team.members = team.members.filter((m) => m.toString() !== userId);
      await team.save();

      await User.findByIdAndUpdate(userId, { $unset: { team: "" } });

      res.status(200).json({ message: "Member removed successfully.", team });
    } catch (err) {
      console.error("RemoveMember Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [GET] /teams/leaderboard
  async getLeaderboard(req, res) {
    try {
      const leaderboard = await Team.find()
        .populate("members", "username")
        .sort({ score: -1 })
        .limit(20);

      res.status(200).json({
        message: "Leaderboard retrieved successfully.",
        leaderboard,
      });
    } catch (err) {
      console.error("GetLeaderboard Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
}

module.exports = new TeamController();
