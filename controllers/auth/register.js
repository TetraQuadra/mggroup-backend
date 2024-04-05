const { nanoid } = require("nanoid");
const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");
// const sendEmail = require("../services/email/sendEmail");

const register = async (req, res, next) => {
  try {
    req.body.verificationToken = nanoid();

    const response = await User.create(req.body);
    if (!response) {
      throw createErrorMessage(500);
    }

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
