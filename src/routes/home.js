const { HomeController } = require("../app/controller/index");
const express = require("express");
const router = express.Router();

router.get("/", HomeController.index);
router.get("/about", HomeController.about);
router.get("/challenges", HomeController.challenges);
router.get("/hackerboard", HomeController.hackerboard);
router.get("/feedback", HomeController.feedback);

module.exports = router;
