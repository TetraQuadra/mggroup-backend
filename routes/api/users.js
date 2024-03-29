const express = require("express");
const userControllers = require("../../controllers/users/index");
const authenticate = require("../../middleware/authenticate");
const encryptPassword = require("../../middleware/encryptPassword");
const validateData = require("../../middleware/validateData");
const { emailSchema } = require("../../schemas/email");
const { userSchema } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateData(userSchema),
  encryptPassword,
  userControllers.register
);

router.post("/login", validateData(userSchema), userControllers.login);

router.get("/current", authenticate, userControllers.getCurrent);

router.get("/", authenticate, userControllers.getAllUsers);

router.patch("/:userId/role", authenticate, userControllers.updateRole);

router.get("/verify/:verificationToken", userControllers.verifyEmail);

router.post(
  "/verify",
  validateData(emailSchema),
  userControllers.resendVerifyEmail
);

module.exports = router;
