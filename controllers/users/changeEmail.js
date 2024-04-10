const createErrorMessage = require("../../helpers/createErrorMessage");
const User = require("../../models/user");

const changeEmail = async (req, res, next) => {
  const { userId } = req.params;
  const { email } = req.body;
  try {
    if (!email) {
      throw createErrorMessage(400, "New email is required");
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw createErrorMessage(404, "User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    );

    res.status(200).json({_id: updatedUser._id, email: updatedUser.email });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = changeEmail;
