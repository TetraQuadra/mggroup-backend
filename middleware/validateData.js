const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw res.status(400).json({
        message: `Invalid field: ${error.details[0].context.label}, ${error.details[0].message}`,
      });
    } else {
      next();
    }
  };
};

module.exports = validateData;
