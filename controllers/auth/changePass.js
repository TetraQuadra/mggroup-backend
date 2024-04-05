const bcrypt = require("bcrypt");
const comparePass = require("../../helpers/comparePass");
const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const changePass = async (req, res, next) => {
  try {
    if (!await comparePass(req.body.password, req.user.password)) {
      throw createErrorMessage(401, "User password is wrong");
    }
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);
    const response = await User.findByIdAndUpdate(
      req.user._id,
      { password: newPassword },
      {
        new: true,
      }
    );
    if (!response) {
      throw createErrorMessage(500);
    }
    res.status(200).json("ok");
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = changePass;
