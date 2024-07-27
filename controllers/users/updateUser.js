const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");
const config = require("../../config.json");

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { email, role, name } = req.body;

  try {
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw createErrorMessage(404, "User not found");
    }

    const updateData = {};
    if (email) {
      updateData.email = email;
    }

    if (name) {
      updateData.name = name;
    }

    if (role) {
      if (!config.adminRoles.includes(role)) {
        throw createErrorMessage(
          400,
          `Wrong role, use one from the following: ${config.adminRoles}`
        );
      }

      if (
        config.adminRoles.indexOf(role) <
        config.adminRoles.indexOf(req.user.role)
      ) {
        throw createErrorMessage(
          401,
          "You can't set a role higher than your own"
        );
      }

      updateData.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw createErrorMessage(500);
    }

    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      role: updatedUser.role,
      name: updatedUser.name,
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = updateUser;
