const config = require("../config.json");
const createErrorMessage = require("../helpers/createErrorMessage");
const User = require("../models/user");

/** Verifies that the role of the action initiator ranks above the target user's role for modifications. */
async function verifyRoleHierarchy(req, res, next) {

    try {
        const userToUpdate = await User.findById(req.params.userId);
        if (!userToUpdate) {
          throw createErrorMessage(404, "User not found");
        }
        req.userToUpdate = userToUpdate;
        if (
            config.adminRoles.indexOf(req.user.role) >=
              config.adminRoles.indexOf(userToUpdate.role) &&
            config.adminRoles.indexOf(req.user.role) !== 0 &&
            config.adminRoles.indexOf(userToUpdate.role) !== -1
          ) {
            throw createErrorMessage(403, "Insufficient permissions");
          }
        next();
      } catch (error) {
        const { status = 500, message = "Internal server error" } = error;
        res.status(status).json({ status, message });
      }
}

module.exports = verifyRoleHierarchy;
