const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const getAllUsers = require("./getAllUsers");
const getUserById = require("./getUserById");
const deleteUser = require("./deleteUser");
const updateRole = require("./updateRole");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  getAllUsers,
  getUserById,
  deleteUser,
  updateRole,
  resendVerifyEmail,
  verifyEmail,
};
