const bcrypt = require("bcrypt");

const encryptPassword = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  next();
};

module.exports = encryptPassword;
