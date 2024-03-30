const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw createErrorMessage(404);
    }

    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastLogined: user.lastLogined,
      },
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = getUserById;
