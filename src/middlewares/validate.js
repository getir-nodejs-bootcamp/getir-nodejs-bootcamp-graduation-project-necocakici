const ApiError = require("../errors/ApiError");

const validate = (schema, source) => (req, res, next) => {
  const { value, error } = schema.validate(req[source]);
  if (error) {
    const errorMessage = error.details
      ?.map((detail) => detail.message)
      .join(",");
    next(new ApiError(errorMessage, 400))
    return;
  }
  Object.assign(req, value);
  next();
};

module.exports = { validate };
