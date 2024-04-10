const { nanoid } = require("nanoid");
const RegisterToken = require("../../models/registerToken");

const createRegisterToken = async (req, res, next) => {
  try {
    const token = nanoid();

    const newToken = await RegisterToken.create({ token, createdBy: req.user._id });

    res.status(201).json({ token: newToken.token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = createRegisterToken;
