const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");
const config = require("../../config.json");

// TODO: discuss about role naming, roles amount, roles rights

const updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!req.body._id) {
      throw createErrorMessage(400, 'Need "_id" field to do this');
    }
    if (!config.adminRoles.includes(role)) {
      throw createErrorMessage(
        400,
        `Wrong role, use one from followed: ${config.adminRoles}`
      );
    }
    const userToUpdate = await User.findById(req.body._id);
    if (!userToUpdate) {
      throw createErrorMessage(404, "User not found");
    }
    if (
      config.adminRoles.indexOf(req.userRole) >=
        config.adminRoles.indexOf(userToUpdate.role) &&
      config.adminRoles.indexOf(req.userRole) !== 0 &&
      config.adminRoles.indexOf(userToUpdate.role) !== -1
    ) {
      throw createErrorMessage(403, "Insufficient permissions");
    }
    const response = await User.findByIdAndUpdate(
      req.body._id,
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

module.exports = updateRole;
