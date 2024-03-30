const config = require("../config.json");
const createErrorMessage = require("./createErrorMessage");

function checkPrivileges(reqUserRole, targetUserRole) {
  if (
    config.adminRoles.indexOf(reqUserRole) >=
      config.adminRoles.indexOf(targetUserRole) &&
    config.adminRoles.indexOf(reqUserRole) !== 0 &&
    config.adminRoles.indexOf(targetUserRole) !== -1
  ) {
    throw createErrorMessage(403, "Insufficient permissions");
  }
}

module.exports = checkPrivileges;
