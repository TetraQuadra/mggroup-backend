const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const getCurrent = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      throw createErrorMessage(404);
    }
    res.status(200).json({
      user: {
        email: user.email,
        subscription: user.subscription,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = getCurrent;
