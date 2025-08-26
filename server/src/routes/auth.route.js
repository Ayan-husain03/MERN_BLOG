import express from "express";
import {
  googleLogin,
  loginUser,
  registerUser,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/google-login").post(googleLogin);

export default authRouter;
