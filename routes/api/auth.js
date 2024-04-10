const express = require("express");
const authControllers = require("../../controllers/auth/index");
const encryptPassword = require("../../middleware/encryptPassword");
const validateData = require("../../middleware/validateData");
const authenticate = require("../../middleware/authenticate");
const { emailSchema } = require("../../schemas/email");
const { userSchema } = require("../../schemas/user");

const router = express.Router();

router.get("/", authenticate, authControllers.getCurrentUser);

router.post(
  "/register/createRegisterToken",
  authenticate,
  authControllers.createRegisterToken
);

router.post(
  "/register/:registerToken",
  validateData(userSchema),
  encryptPassword,
  authControllers.register
);

router.post("/login", validateData(userSchema), authControllers.login);

router.get("/verify/:verificationToken", authControllers.verifyEmail);

router.post(
  "/verify/resend",
  validateData(emailSchema),
  authControllers.resendVerifyEmail
);

router.patch(
  "/password",
  authenticate,
  authControllers.changePass
);

module.exports = router;
