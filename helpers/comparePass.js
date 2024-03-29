const bcrypt = require("bcrypt");
const createErrorMessage = require("./createErrorMessage");

const comparePass = async (pass1, pass2) => {
  const isEqual = await bcrypt.compare(pass1, pass2);
  if (!isEqual) {
    throw createErrorMessage(401, "Email or password is invalid");
  }
};

module.exports = comparePass;
