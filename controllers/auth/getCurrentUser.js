

const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: {
        _id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
        lastLogined: req.user.lastLogined,
      },
    });
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};

module.exports = getCurrentUser;
