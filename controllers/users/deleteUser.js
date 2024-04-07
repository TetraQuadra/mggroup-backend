const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      throw createErrorMessage(404);
    }

    const response = await User.findByIdAndDelete(req.params.userId);

    if (!response) {
      throw createErrorMessage(500);
    }

    res.status(200).json("ok");
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = deleteUser;
