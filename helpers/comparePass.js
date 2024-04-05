const bcrypt = require("bcrypt");

const comparePass = async (pass1, pass2) => {
  const isEqual = await bcrypt.compare(pass1, pass2);
  return isEqual;
};

module.exports = comparePass;
