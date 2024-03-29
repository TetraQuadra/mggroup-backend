const statuses = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};

const createErrorMessage = (status, message = statuses[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = createErrorMessage;
