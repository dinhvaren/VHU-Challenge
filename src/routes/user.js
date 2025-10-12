const express = require("express");
const router = express.Router();
const { UserController } = require("../app/controller/index");

// Admin routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);
// User route
router.get("/profile/me", UserController.getProfile);

module.exports = router;
