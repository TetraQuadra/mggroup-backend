const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const verifyEmail = async (req, res, next) => {
  try {
    const query = { verificationToken: req.params.verificationToken };
    console.log(req.params);
    const response = await User.findOneAndUpdate(
      query,
      {
        verify: true,
        verificationToken: null,
      },
      {
        new: true,
      }
    );
    if (!response) {
      throw createErrorMessage(404);
    }
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = verifyEmail;
