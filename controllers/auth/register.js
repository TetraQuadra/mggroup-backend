const { nanoid } = require("nanoid");
const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");
const RegisterToken = require("../../models/registerToken");
// const sendEmail = require("../services/email/sendEmail");

const register = async (req, res, next) => {
  if (!req.params.registerToken) {
    throw createErrorMessage(400, "Provide register token");
  }
  try {
    const registerToken = await RegisterToken.findOne({
      token: req.params.registerToken,
    });
    if (!registerToken) {
      throw createErrorMessage(401, "Token is invalid");
    }
    if (registerToken.usedBy) {
      throw createErrorMessage(401, "Register token already used");
    }
    req.body.verificationToken = nanoid();

    const response = await User.create(req.body);
    if (!response) {
      throw createErrorMessage(500);
    }
    await RegisterToken.findOneAndUpdate(
      { token: req.params.registerToken },
      { $set: { usedBy: response._id, claimedAt: Date.now() } }
    );
    const email = {
      recipient: req.body.email,
      body: `Click <a href="http://${process.env.BASE_URL}api/auth/verify/${req.body.verificationToken}">here</a> to verify your email.`,
    };
    // sendEmail(email);
    console.log(email);

    res.status(201).json("ok");
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = register;
