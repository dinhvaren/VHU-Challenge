const { HomeController } = require("../app/controller/index");
const express = require("express");
const router = express.Router();

router.get("/", HomeController.index);

module.exports = router;