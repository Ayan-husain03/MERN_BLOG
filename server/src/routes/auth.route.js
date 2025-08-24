import express from "express";
import { loginUser, registerUser } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);

export default authRouter;
