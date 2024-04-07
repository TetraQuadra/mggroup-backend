const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw createErrorMessage(404, "User not found");
    }

    res.status(200).json({ message: "User deleted successfully", userId });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = deleteUser;
