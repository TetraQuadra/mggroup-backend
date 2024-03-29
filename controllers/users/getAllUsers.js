const User = require("../../models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    const usersInfo = users.map((user) => ({
      _id: user._id,
      email: user.email,
      role: user.role,
      verify: user.verify,
      createdAt: user.createdAt,
      lastLogined: user.lastLogined,
    }));
    res.status(200).json(usersInfo);
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = getAllUsers;
