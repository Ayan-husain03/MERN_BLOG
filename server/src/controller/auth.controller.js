import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

// * Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(404)
      .json(new ApiResponse(402, "All fields are required", null));
  // check user is existed or not
  const existUser = await User.findOne({ email });
  if (existUser)
    return res
      .status(404)
      .json(new ApiResponse(402, "User already exist with this email", null));
  const user = await User.create({
    username,
    email,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

export { registerUser };
