const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);
router.post("/create-user", userController.createUser);

// router.post("/login", (req, res) => userController.login(req, res));

module.exports = router;
