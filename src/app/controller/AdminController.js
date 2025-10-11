const { User, Team, Challenge, Submission } = require("../models");

class AdminController {
  // [GET] /admin/dashboard
  async dashboard(req, res) {
    try {
      const [userCount, teamCount, challengeCount, submissionCount] =
        await Promise.all([
          User.countDocuments(),
          Team.countDocuments(),
          Challenge.countDocuments(),
          Submission.countDocuments(),
        ]);

      const recentSubmissions = await Submission.aggregate([
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$submittedAt" },
            },
            total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      res.render("admin/admin", {
        title: "Admin Dashboard | VHU InfoSec Lab",
        stats: {
          users: userCount,
          teams: teamCount,
          challenges: challengeCount,
          submissions: submissionCount,
        },
        chartData: JSON.stringify(recentSubmissions),
      });
    } catch (err) {
      console.error("Admin Dashboard Error:", err);
      res.status(500).render("error/500", {
        message: "Server error while loading dashboard.",
      });
    }
  }

  // [GET] /admin/users
  async listUsers(req, res) {
    try {
      const users = await User.find().populate("team").lean();
      res.render("admin/users", {
        title: "Manage Users | VHU InfoSec Lab",
        users,
      });
    } catch (err) {
      console.error("List Users Error:", err);
      res.status(500).render("error/500", { message: "Failed to load users." });
    }
  }

  // [GET] /admin/teams
  async listTeams(req, res) {
    try {
      const teams = await Team.find().populate("members").lean();
      res.render("admin/teams", {
        title: "Manage Teams | VHU InfoSec Lab",
        teams,
      });
    } catch (err) {
      console.error("List Teams Error:", err);
      res.status(500).render("error/500", { message: "Failed to load teams." });
    }
  }

  // [GET] /admin/challenges
  async listChallenges(req, res) {
    try {
      const challenges = await Challenge.find().lean();
      res.render("admin/challenges", {
        title: "Manage Challenges | VHU InfoSec Lab",
        challenges,
      });
    } catch (err) {
      console.error("List Challenges Error:", err);
      res
        .status(500)
        .render("error/500", { message: "Failed to load challenges." });
    }
  }

  // [POST] /admin/challenges
  async addChallenge(req, res) {
    try {
      const newChallenge = new Challenge(req.body);
      await newChallenge.save();
      res.status(201).json({ message: "Challenge created successfully!" });
    } catch (err) {
      console.error("Add Challenge Error:", err);
      res.status(400).json({ message: "Failed to create challenge." });
    }
  }

  // [GET] /admin/leaderboard
  async leaderboard(req, res) {
    try {
      const teams = await Team.find()
        .sort({ score: -1 })
        .limit(20)
        .lean();

      res.render("admin/leaderboard", {
        title: "Leaderboard | VHU InfoSec Lab",
        teams,
      });
    } catch (err) {
      console.error("Leaderboard Error:", err);
      res.status(500).render("error/500", { message: "Failed to load leaderboard." });
    }
  }
}

module.exports = new AdminController();
