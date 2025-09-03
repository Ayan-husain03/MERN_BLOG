import express from "express";
import {
  getUser,
  googleLogin,
  loginUser,
  logout,
  registerUser,
  updatePassword,
  updateUser,
} from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/google-login").post(googleLogin);
authRouter.route("/logout").get(logout);
authRouter.route("/get-user/:_id").get(getUser);
authRouter.route("/update-user/:_id").put(upload.single("file"), updateUser);
authRouter.route("/update-password/:_id").put(updatePassword);

export default authRouter;
