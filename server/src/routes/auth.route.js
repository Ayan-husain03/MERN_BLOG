import express from "express";
import {
  getUser,
  googleLogin,
  loginUser,
  logout,
  registerUser,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/google-login").post(googleLogin);
authRouter.route("/logout").get(logout);
authRouter.route("/get-user/:_id").get(getUser);

export default authRouter;
