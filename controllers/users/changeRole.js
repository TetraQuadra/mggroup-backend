const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");
const config = require("../../config.json");

// TODO: discuss about role naming, roles amount, roles rights

const changeRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!config.adminRoles.includes(role)) {
      throw createErrorMessage(
        400,
        `Wrong role, use one from followed: ${config.adminRoles}`
      );
    }

    if (config.adminRoles.indexOf(req.body.role) < config.adminRoles.indexOf(req.user.role)) {
      throw createErrorMessage(401, "You can't set role higher than your own");
    }

    const userToUpdate = await User.findById(req.params.userId);
    if (!userToUpdate) {
      throw createErrorMessage(404, "User not found");
    }

    const response = await User.findByIdAndUpdate(
      req.params.userId,
      { role: role },
      {
        new: true,
      }
    );
    if (!response) {
      throw createErrorMessage(500);
    }
    res.status(200).json({
      role: response.role,
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = changeRole;
