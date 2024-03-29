const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const getAllUsers = require("./getAllUsers");
const updateRole = require("./updateRole");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  getAllUsers,
  updateRole,
  resendVerifyEmail,
  verifyEmail,
};
