import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res
      .status(error.statusCode)
      .json(new ApiResponse(error.statusCode, error.message, null));
  }
  return res
    .status(500)
    .json(new ApiResponse(500, "Something went wrong", null));
};

export default errorHandler;
