const express = require("express");
const authControllers = require("../../controllers/auth/index");
const encryptPassword = require("../../middleware/encryptPassword");
const validateData = require("../../middleware/validateData");
const { emailSchema } = require("../../schemas/email");
const { userSchema } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateData(userSchema),
  encryptPassword,
  authControllers.register
);

router.post("/login", validateData(userSchema), authControllers.login);

router.get("/verify/:verificationToken", authControllers.verifyEmail);

router.post(
  "/verify",
  validateData(emailSchema),
  authControllers.resendVerifyEmail
);

module.exports = router;
