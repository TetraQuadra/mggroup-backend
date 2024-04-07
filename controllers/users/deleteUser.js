const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await User.findByIdAndDelete(userId);

    if (!response) {
      throw createErrorMessage(404, "User not found");
    }

    res.status(200).json({ message: "User deleted successfully", userId });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = deleteUser;
