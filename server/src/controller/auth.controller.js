import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

// * generate token
function generateToken(id) {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  path: "/",
};

// * Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new ApiError(400, "All fields are required");
  // check user is existed or not
  const existUser = await User.findOne({ email });
  if (existUser) throw new ApiError(409, "User already exist with this email");
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

// * Login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "All fields are required");
  const existedUser = await User.findOne({ email });
  if (!existedUser) throw new ApiError(404, "User doesn't not exist");
  const matchPass = await existedUser.isPasswordCorrect(password);
  if (!matchPass) throw new ApiError(404, "Password is incorrect");
  const user = await User.findById(existedUser?._id).select("-password");
  const token = generateToken(existedUser?._id);

  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, "user logged in", user));
});

// ? Google login
const googleLogin = asyncHandler(async (req, res) => {
  const { username, email, avatar } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    // create new user
    const password = username + "123";
    user = await User.create({
      username,
      email,
      avatar,
      password,
    });
  }
  const token = generateToken(user?._id);
  return res
    .status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, "User logged in", user));
});

// * logout controller
const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, "user logged out"));
});

export { registerUser, loginUser, googleLogin, logout };
