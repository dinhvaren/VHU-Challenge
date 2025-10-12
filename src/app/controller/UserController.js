const { User } = require("../models/index");
const bcrypt = require("bcryptjs");

class UserController {
  // [GET] /users
  async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .populate("team", "name")
        .select("-password")
        .sort({ createdAt: -1 });

      res.status(200).json({
        message: "List of users retrieved successfully.",
        total: users.length,
        users,
      });
    } catch (err) {
      console.error("GetAllUsers Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [GET] /users/:id
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .populate("team", "name")
        .populate("solved", "title category points")
        .select("-password");

      if (!user)
        return res.status(404).json({ message: "User not found." });

      res.status(200).json({ user });
    } catch (err) {
      console.error("GetUserById Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [PUT] /users/:id
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role, status, score, password } = req.body;

      const user = await User.findById(id);
      if (!user)
        return res.status(404).json({ message: "User not found." });

      if (username) user.username = username;
      if (email) user.email = email;
      if (role) user.role = role;
      if (status) user.status = status;
      if (typeof score === "number") user.score = score;

      if (password) {
        const hashed = await bcrypt.hash(password, 10);
        user.password = hashed;
      }

      await user.save();

      res.status(200).json({
        message: "User updated successfully.",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          score: user.score,
        },
      });
    } catch (err) {
      console.error("UpdateUser Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [DELETE] /users/:id
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deleted = await User.findByIdAndDelete(id);

      if (!deleted)
        return res.status(404).json({ message: "User not found." });

      res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      console.error("DeleteUser Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }

  // [GET] /users/profile
  async getProfile(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId)
        return res.status(401).json({ message: "Unauthorized. Please log in." });

      const user = await User.findById(userId)
        .populate("team", "name")
        .populate("solved", "title category points")
        .select("-password");

      if (!user)
        return res.status(404).json({ message: "User not found." });

      res.status(200).json({ user });
    } catch (err) {
      console.error("GetProfile Error:", err);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }
}

module.exports = new UserController();
