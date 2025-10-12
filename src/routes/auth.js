const express = require("express");
const router = express.Router();
const { AuthController } = require("../app/controller/index");


router.get("/login", AuthController.showLogin);
router.get("/register-individual", AuthController.showRegisterIndividual);
router.get("/register", AuthController.showRegister);
router.post("/login", AuthController.login);
router.post("/register-individual", AuthController.registerIndividual);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);

module.exports = router;
