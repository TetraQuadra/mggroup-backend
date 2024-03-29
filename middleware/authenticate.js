const jwt = require("jsonwebtoken");
const User = require("../models/user");
const createErrorMessage = require("../helpers/createErrorMessage");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw createErrorMessage(400, "Invalid token");
  }
  const tokenMatch = authorization.match(/Bearer (.+)/);
  const token = tokenMatch[1];
  if (!token) {
    throw createErrorMessage(401);
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user || user.token !== token) {
      throw createErrorMessage(401);
    }
    req.user = user._id;
    req.userRole = user.role;
    next();
  } catch (error) {
    const { status = 500, message = "Internal server error" } = error;
    res.status(status).json({ status, message });
  }
};
module.exports = authenticate;
