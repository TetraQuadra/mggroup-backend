const validateArticle = (schema) => {
  return (req, res, next) => {
    const currentSchema = schema(req);
    if (currentSchema === "not found") {
      return res.status(400).json({ message: "Invalid section" });
    }

    const { error } = currentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: `Invalid field: ${error.details[0].context.label}, ${error.details[0].message}`,
      });
    } else {
      next();
    }
  };
};

module.exports = validateArticle;
