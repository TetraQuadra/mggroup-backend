const getCurrentUser = require("./getCurrentUser");
const login = require("./login");
const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const changePass = require("./changePass");

module.exports = {
  getCurrentUser,
  login,
  register,
  verifyEmail,
  resendVerifyEmail,
  changePass,
};
