const joi = require("joi");

const userSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().required(),
});

module.exports = { userSchema };
