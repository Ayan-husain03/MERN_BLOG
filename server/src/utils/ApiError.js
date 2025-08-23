class ApiError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default ApiError;
