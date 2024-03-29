const joi = require("joi");

const emailSchema = joi.object({
  email: joi.string().email().required(),
});

module.exports = { emailSchema };
